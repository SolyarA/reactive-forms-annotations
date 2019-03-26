import { AbstractControl, Validators } from '@angular/forms';
import {
  form,
  formArray,
  formControl, formGroup,
  FormGroup,
  Type,
  TypeArray,
  TypeNumber,
  TypeString
} from '../../../object-oriented-reactive-forms/src';

export enum ClientType {
  Business = 0,
  Private = 1
}

@form
export class Address extends FormGroup {

  constructor(street: string, city: string) {
    super({});
    this.street = street as TypeString;
    this.city = city as TypeString;
  }

  @formControl([Validators.required])
  street: TypeString;

  @formControl()
  city: TypeString;
}

@form
export class Client extends FormGroup {

  constructor() {
    super({});
    this.age = 4 as TypeNumber;
    this.type = ClientType.Private as Type<ClientType>;
    this.cards = [new Card('6345764574'), new Card('32423454543')] as TypeArray<Card>;
    this.address = new Address('Test', 'Warsaw');
    this.test = 'Hello word';
  }

  test: string;


  @formControl([Validators.required])
  fullName: TypeString;

  @formControl([Validators.required])
  businessName: TypeString;

  @formControl()
  age: TypeNumber;

  @formControl([Validators.required], [Client.clientTypeBehavior])
  type: Type<ClientType>;

  @formGroup(Address)
  address: Type<Address>;

  @formArray(null, Client.testArrayBehavior)
  cards: TypeArray<Card>;

  private static clientTypeBehavior(control: Type<ClientType>, client: Client): void {
    switch (control.value) {
      case ClientType.Business:
        client.businessName.enable();
        client.fullName.disable();
        break;
      case ClientType.Private:
        client.businessName.disable();
        client.fullName.enable();
        break;
    }
  }

  private static testArrayBehavior(control: TypeArray<Card>, client: Client): void {
    console.log(control.value);
  }
}

@form
export class Card extends FormGroup {

  constructor(cardNumber: string) {
    super({});
    this.cardNumber = cardNumber as TypeString;
    this.expiry = new Date(2019, 1, 1) as Type<Date>;
    this.cvv = 123 as TypeNumber;
  }

  @formControl([Validators.required])
  cardNumber: TypeString;

  @formControl()
  expiry: Type<Date>;

  @formControl()
  cvv: TypeNumber;
}


