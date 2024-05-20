import { Entity, Column } from 'typeorm'
import Base from './base'

@Entity({ name: 'saas_operate_log', comment: 'saas生成操作记录' })
export default class extends Base {
    @Column({ type: 'int' })
    moduleId

    @Column({ type: 'int' })
    projectId

    @Column({ type: 'varchar' })
    status

    @Column({ type: 'varchar' })
    builderId

    @Column({ type: 'varchar' })
    operateType

    @Column({ type: 'text' })
    payloadData
}
