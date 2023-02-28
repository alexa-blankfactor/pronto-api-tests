export class PhoneNumber{
    private countryCode: string;
    private phoneNumber: number;
    private smsEnabled: boolean;

    public getSmsEnabled(): boolean {
        return this.smsEnabled;
    }
    public setSmsEnabled(value: boolean) {
        this.smsEnabled = value;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }
    public setPhoneNumber(value: number) {
        this.phoneNumber = value;
    }
    public getCountryCode(): string {
        return this.countryCode;
    }
    public setCountryCode(value: string) {
        this.countryCode = value;
    }
}