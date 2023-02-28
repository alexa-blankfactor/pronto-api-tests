import{Address} from './Address';
import { PhoneNumber } from './PhoneNumber';

export class User{
    private firstName: string;
    private middleName: string;
    private lastName: string;
    private email: string;
    private username: string;
    private dateOfBirth: Date;
    private taxId: string;
    private taxCountry: string;
    private deviceToken: string;
    private address: Address;
    private phoneNumber: PhoneNumber;
    private password: string;

    constructor(){
        this.address= new Address();
        this.phoneNumber= new PhoneNumber();
    }

    public getFirstName(): string {
        return this.firstName;
    }
    public setFirstName(value: string) {
        this.firstName = value;
    }

    public getMiddleName(): string {
        return this.middleName;
    }
    public setMiddleName(value: string) {
        this.middleName = value;
    }
    public getLastName(): string {
        return this.lastName;
    }
    public setLastName(value: string) {
        this.lastName = value;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }

    public getUsername(): string {
        return this.username;
    }
    public setUsername(value: string) {
        this.username = value;
    }

    public getDateOfBirth(): Date {
        return this.dateOfBirth;
    }
    public setDateOfBirth(value: Date) {
        this.dateOfBirth = value;
    }
    public getTaxId(): string {
        return this.taxId;
    }
    public setTaxId(value: string) {
        this.taxId = value;
    }

    public getTaxCountry(): string {
        return this.taxCountry;
    }
    public setTaxCountry(value: string) {
        this.taxCountry = value;
    }
    public getDeviceToken(): string {
        return this.deviceToken;
    }
    public setDeviceToken(value: string) {
        this.deviceToken = value;
    }

    public getAddress(): Address {
        return this.address;
    }
    public setAddress(value: Address) {
        this.address = value;
    }
    public getPhoneNumber(): PhoneNumber {
        return this.phoneNumber;
    }
    public setPhoneNumber(value: PhoneNumber) {
        this.phoneNumber = value;
    }

    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }
}