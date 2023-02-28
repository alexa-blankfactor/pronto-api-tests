export class Address{
    private addressLines: string[];
    private locality: string;
    private administrativeArea: string;
    private postalCode: string;
    private countryIso3: string;


    public getCountryIso3(): string {
        return this.countryIso3;
    }
    public setCountryIso3(value: string) {
        this.countryIso3 = value;
    }
    public getPostalCode(): string {
        return this.postalCode;
    }
    public setPostalCode(value: string) {
        this.postalCode = value;
    }

    public getAdministrativeArea(): string {
        return this.administrativeArea;
    }
    public setAdministrativeArea(value: string) {
        this.administrativeArea = value;
    }
    public getLocality(): string {
        return this.locality;
    }
    public setLocality(value: string) {
        this.locality = value;
    }

    public getAddressLines(): string[] {
        return this.addressLines;
    }
    public setAddressLines(value: string[]) {
        this.addressLines=value;
    }
    

    
}