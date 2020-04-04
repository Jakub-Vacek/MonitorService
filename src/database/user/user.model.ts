import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MonitoredEndpoint } from '../monitored-endpoint';

/**
 * Class represents user database model.
 */

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn('varchar', { name: 'id', length: 36 })
    public readonly id!: string;
    @Column({ name: 'user_name', nullable: false })
    public readonly name: string;
    @Column({ name: 'email', nullable: false })
    public readonly email: string;
    @Column({ name: 'access_token', length: 36, nullable: false })
    public readonly accessToken: string;
    @OneToMany(
        (): typeof MonitoredEndpoint => MonitoredEndpoint,
        (entity: MonitoredEndpoint): User => entity.owner
    )
    public endpoints!: MonitoredEndpoint[];
    public constructor(name: string, email: string, accessToken: string) {
        this.name = name;
        this.email = email;
        this.accessToken = accessToken;
    }
}
