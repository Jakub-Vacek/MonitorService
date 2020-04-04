import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user';
import { MonitoringResult } from '../monitoring-result';

/**
 * Class represents monitored endpoint database model.
 */

@Entity({ name: 'monitored_endpoints' })
export class MonitoredEndpoint {
    @PrimaryGeneratedColumn({ name: 'id'})
    public readonly id!: number;
    @Column({ name: 'name', nullable: false })
    public readonly name: string;
    @Column({ name: 'url', nullable: false })
    public readonly url: string;
    @Column({ name: 'created', type: 'datetime', precision: 3, nullable: false })
    public readonly created: Date;
    @Column({ name: 'last_checked', type: 'datetime', precision: 3, nullable: true })
    public readonly lastChecked: Date | null;
    @Column({ name: 'monitored_interval', type: 'integer', nullable: false })
    public readonly monitoredInterval: number;
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    @ManyToOne(
        (): typeof User => User,
        (entity: User): MonitoredEndpoint[] => entity.endpoints
    )
    public readonly owner: User;
    @OneToMany(
        (): typeof MonitoringResult => MonitoringResult,
        (entity: MonitoringResult): MonitoredEndpoint => entity.monitoredEndpoint
    )
    public readonly monitoringResults!: MonitoringResult[];

    public constructor(name: string, url: string, monitoredInterval: number, owner: User) {
        this.name = name;
        this.url = url;
        this.created = new Date();
        this.lastChecked = null;
        this.monitoredInterval = monitoredInterval;
        this.owner = owner;
    }
}
