import { IsInt, Min, IsUrl, IsString, IsNotEmpty } from 'class-validator';

export class ValidMonitoredEndpoint {
    @IsString()
    @IsNotEmpty()
    public readonly name!: string;
    @IsUrl({require_tld: false})
    public readonly url!: string;
    @IsInt()
    @Min(1)
    public readonly monitoredInterval!: number;
}
