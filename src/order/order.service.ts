import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { In, Repository } from 'typeorm';
import { Order, Status } from './entities/order.entity';
import { StoreOrdersItems } from 'src/store-orders-items/entities/store-orders-items.entity';
import { Item } from 'src/item/entities/item.entity';
import { CreateStoreOrdersItemDto } from 'src/store-orders-items/dto/create-store-orders-item.dto';
import { StoreService } from 'src/store/store.service';
import { ItemProps, SendReceiptDto } from './dto/send-receipt.dto';
import { sendEmail } from '../../config/nodemailer.config';
import { Store } from 'src/store/entities/store.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('STORE_ORDERS_ITEMS_REPOSITORY')
    private storeOrdersItemsRepository: Repository<StoreOrdersItems>,
    @Inject('ITEM_REPOSITORY')
    private itemsRepository: Repository<Item>,

    @Inject('STORE_REPOSITORY')
    private storeRepository: Repository<Store>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { items, ...orderData } = createOrderDto;

    try {
      const createdOrder = await this.orderRepository.save(orderData);

      const createdOrderObj = {
        ...createdOrder,
        orderItems: [],
      };

      for (const itemData of items) {
        const storeItem = await this.itemsRepository.findOne({
          where: { id: itemData.itemId },
        });
        if (storeItem) {
          const storeOrderItemObj: CreateStoreOrdersItemDto = {
            storeId: storeItem.storeId,
            itemId: itemData.itemId,
            orderId: createdOrder.id,
            quantity: itemData.quantity,
            unitPrice: itemData.unitPrice,
          };

          const createdStoreOrderItem =
            await this.storeOrdersItemsRepository.save(storeOrderItemObj);

          createdOrderObj.orderItems.push(createdStoreOrderItem);
        }
      }

      return createdOrderObj;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  async updateOrderStatus(id: number, newStatus: Status) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.status = newStatus;
    await this.orderRepository.update(id, order);

    return `Order status updated to "${newStatus}" successfully`;
  }

  async sendReceiptByEmail(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const store = await this.storeRepository.findOne({
      where: { id: order.storeId },
    });

    const storeOrdersItems = await this.storeOrdersItemsRepository.find({
      where: { orderId: id },
    });

    const itemIds = storeOrdersItems.map((item) => item.itemId);
    const items = await this.itemsRepository.find({
      where: { id: In(itemIds) },
    });

    const orderProps: SendReceiptDto = {
      id: order.id,
      customer_email: order.customer_email,
      storeId: order.storeId,
      storeName: store ? store.name : '',
      amountInUSD: order.amountInUSD,
      amountInEth: order.amountInEth,
      amountInWei: order.amountInWei,
      amountInUSDC: order.amountInUSDC,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        sku: item.sku,
        unitPrice: item.price,
        quantity:
          storeOrdersItems.find((orderItem) => orderItem.itemId === item.id)
            ?.quantity || 0,
        thumbnail: item.thumbnail,
        storeId: item.storeId,
        created_at: item.created_at,
      })),
      paymentProof: order.paymentProof,
      paymentFactoryAddress: order.paymentFactoryAddress,
      paymentAddress: order.paymentAddress,
      paymentTransactionHash: order.paymentTransactionHash,
      paymentReceipt: order.paymentReceipt,
      created_at: order.created_at,
    };

    console.log(orderProps);

    const html = await this.createHtml(orderProps);

    const emailSent = await sendEmail(order.customer_email, store.name, html);
    console.log(
      '🚀 ~ file: order.service.ts:135 ~ OrderService ~ sendReceiptByEmail ~ emailSent:',
      emailSent,
    );

    return emailSent;
  }

  async createHtml(receipt: SendReceiptDto) {
    const generateItemRows = (items: ItemProps[]) => {
      return items
        .map(
          (item) => `
        <tr>
          <td>${item.sku}</td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.unitPrice.toFixed(2)}</td>
          <td>${(item.unitPrice * item.quantity).toFixed(2)}</td>
        </tr>
      `,
        )
        .join('');
    };

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
      <div style="width: 100%; padding: 0;">
        <div style="margin-bottom: 15px;">
          <div>
            <div style="gap: 5px; align-items: flex-start; justify-content: flex-start; flex-direction: column;">
              <p style="margin-bottom: -5px; font-weight: bold;">
                ${receipt.created_at.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })} - 
                ${receipt.created_at.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              ${
                !receipt.paymentTransactionHash
                  ? '<p style="font-size: 14px; color: orange;">Transaction hash: pending</p>'
                  : `<p style="font-size: 14px;">Transaction hash: ${receipt.paymentTransactionHash}</p>`
              }
            </div>
          </div>
        </div>
    
        <table>
          <thead>
            <tr>
              <th style="font-weight: bold;">#SKU</th>
              <th style="font-weight: bold;">NAME</th>
              <th style="font-weight: bold;">QTY</th>
              <th style="font-weight: bold;">PRICE</th>
              <th style="font-weight: bold;">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${generateItemRows(receipt.items)}
          </tbody>
        </table>
    
        <div style="margin-top: 30px;">
          <table>
          <text style="font-size: 14px; font-weight: bold;">TOTAL</text>
            <tbody>
              <tr>
                <td>
                  <div style="gap: 16px; align-items: flex-end; justify-content: flex-start; flex-direction: column; flex-wrap: wrap;">
                    <p style="font-size: 14px; font-weight: bold;">${Number(receipt.amountInUSD).toFixed(
                      2,
                    )} USD</p>
                    <p style="font-size: 14px; font-weight: bold;">${Number(receipt.amountInEth).toFixed(
                      8,
                    )} ETH</p>
                    <p style="font-size: 14px; font-weight: bold;">${Number(receipt.amountInWei).toFixed(
                      8,
                    )} WEI</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <text>
          <p style="font-size: 14px; font-weight: bold;">Thank you for your purchase!</p>
        </text>
      </div>
    </body>
    </html>
    `;
    return html;
  }
}
