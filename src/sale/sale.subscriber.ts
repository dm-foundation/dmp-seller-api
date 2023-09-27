import { Logger } from '@nestjs/common';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RecoverEvent, RemoveEvent, SoftRemoveEvent, TransactionCommitEvent, TransactionRollbackEvent, TransactionStartEvent, UpdateEvent } from 'typeorm';
import { Sale } from './entities/sale.entity';

@EventSubscriber()
export class SaleSubscriber implements EntitySubscriberInterface<Sale> {

    listenTo() {
        Logger.log("listenTo Sale");
        return Sale;
    }

    afterLoad(entity: Sale) {
        console.log(`***AFTER ENTITY LOADED: `, entity)
    }

    /**
     * Called before entity insertion.
     */
    beforeInsert(event: InsertEvent<Sale>) {
        console.log(`***BEFORE ENTITY INSERTED: `, event.entity)
    }

    /**
     * Called after entity insertion.
     */
    afterInsert(event: InsertEvent<Sale>) {
        console.log(`***AFTER ENTITY INSERTED: `, event.entity)
    }

    /**
     * Called before entity update.
     */
    beforeUpdate(event: UpdateEvent<Sale>) {
        console.log(`***BEFORE ENTITY UPDATED: `, event.entity)
    }

    /**
     * Called after entity update.
     */
    afterUpdate(event: UpdateEvent<Sale>) {
        console.log(`***AFTER ENTITY UPDATED: `, event.entity)
    }

    /**
     * Called before entity removal.
     */
    beforeRemove(event: RemoveEvent<Sale>) {
        console.log(
            `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called after entity removal.
     */
    afterRemove(event: RemoveEvent<Sale>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called before entity removal.
     */
    beforeSoftRemove(event: SoftRemoveEvent<Sale>) {
        console.log(
            `BEFORE ENTITY WITH ID ${event.entityId} SOFT REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called after entity removal.
     */
    afterSoftRemove(event: SoftRemoveEvent<Sale>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} SOFT REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called before entity recovery.
     */
    beforeRecover(event: RecoverEvent<Sale>) {
        console.log(
            `BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `,
            event.entity,
        )
    }

    /**
     * Called after entity recovery.
     */
    afterRecover(event: RecoverEvent<Sale>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `,
            event.entity,
        )
    }

    /**
     * Called before transaction start.
     */
    beforeTransactionStart(event: TransactionStartEvent) {
        console.log(`******** BEFORE TRANSACTION STARTED: `, event)
    }

    /**
     * Called after transaction start.
     */
    afterTransactionStart(event: TransactionStartEvent) {
        console.log(`***AFTER TRANSACTION STARTED: `, event)
    }

    /**
     * Called before transaction commit.
     */
    beforeTransactionCommit(event: TransactionCommitEvent) {
        console.log(`***BEFORE TRANSACTION COMMITTED: `, event)
    }

    /**
     * Called after transaction commit.
     */
    afterTransactionCommit(event: TransactionCommitEvent) {
        console.log(`***AFTER TRANSACTION COMMITTED: `, event)
    }

    /**
     * Called before transaction rollback.
     */
    beforeTransactionRollback(event: TransactionRollbackEvent) {
        console.log(`***BEFORE TRANSACTION ROLLBACK: `, event)
    }

    /**
     * Called after transaction rollback.
     */
    afterTransactionRollback(event: TransactionRollbackEvent) {
        console.log(`***AFTER TRANSACTION ROLLBACK: `, event)
    }
}
