import { User } from "../domain/User";
import { BaseBuilder } from "./BaseBuilder";
import {CountryIso3} from '../constans/CountryIso3';

export class UserBuilder extends BaseBuilder<User>{
    protected entity: User;
    constructor(){
        super();
        this.entity= new User();
    }

    public withFristName(firstName: string): this{
        this.entity.setFirstName(firstName) ;
        return this;
    }

    public withMiddleName(middleName: string): this{
        this.entity.setMiddleName(middleName);
        return this;
    }
    public withLastName(lastName: string): this{
        this.entity.setLastName(lastName);
        return this;
    }
    public withEmail(email: string): this{
        this.entity.setEmail(email);
        return this;
    }

    public withUserName(username: string): this{
        this.entity.setUsername(username);
        return this;
    }
    public withDateOfBirth(dateOfBirth: Date): this{
        this.entity.setDateOfBirth(dateOfBirth);
        return this;
    }
    public withTaxId(taxId: string): this{
        this.entity.setTaxId(taxId);
        return this;
    }
    public withTaxCountry(taxCountry: string){
        this.entity.setTaxCountry(taxCountry);
        return this;
    }
    public withDeviceToken(deviceToken: string): this{
        this.entity.setDeviceToken(deviceToken);
        return this;
    }

    public withPassword(password:  string): this{
        this.entity.setPassword(password);
        return this;
    }
    public withAddressLines(addressLines:  string[]): this{
        this.entity.getAddress().setAddressLines(addressLines);
        return this;
    }
    public withAddressLocality(locality:  string): this{
        this.entity.getAddress().setLocality(locality);
        return this;
    }
    public withAddressAdministrativeArea(administrativeArea:  string): this{
        this.entity.getAddress().setAdministrativeArea(administrativeArea);
        return this;
    }
    public withAddressPostalCode(postalCode:  string): this{
        this.entity.getAddress().setPostalCode(postalCode);
        return this;
    }
    public withAddressCountryIso3(countryIso3:  CountryIso3): this{
        this.entity.getAddress().setCountryIso3(CountryIso3[countryIso3]);
        return this;
    }
    public withPhoneNumber(phoneNumber:  number): this{
        this.entity.getPhoneNumber().setPhoneNumber(phoneNumber);
        return this;
    }
    public withPhoneNumberCountryCode(countryCode:  string): this{
        this.entity.getPhoneNumber().setCountryCode(countryCode);
        return this;
    }
    public withPhoneNumberSmsEnabled(smsEnabled:  boolean): this{
        this.entity.getPhoneNumber().setSmsEnabled(smsEnabled);
        return this;
    }

}