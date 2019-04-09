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
import * as moment from 'moment';
import { Moment } from 'moment';

export enum ClientType {
  Business = 0,
  Private = 1
}

@form
export class Address extends FormGroup {

  constructor() {
    super();
  }

  @formControl([Validators.required])
  addressLine1: TypeString;

  @formControl()
  addressLine2: TypeString;

  @formControl([Validators.required])
  region: TypeString;

  @formControl([Validators.required])
  city: TypeString;

  @formControl([Validators.required])
  country: TypeString;

  @formControl([Validators.required])
  postCode: TypeString;
}

@form
export class Client extends FormGroup {

  constructor() {
    super();
    this.dateOfBirth = moment() as Type<Moment>;
    this.type = ClientType.Private as Type<ClientType>;
    this.cards = [new Card('6345764574'), new Card('32423454543')] as TypeArray<Card>;
    this.address = new Address();
    this.test = 'Hello word';
  }

  test: string;


  @formControl([Validators.required])
  fullName: TypeString;

  @formControl()
  phoneNumber: TypeString;

  @formControl()
  dateOfBirth: Type<Moment>;

  @formControl([Validators.required])
  businessName: TypeString;

  @formControl([Validators.required])
  vatNumber: TypeString;

  @formControl([Validators.required], [Client.clientTypeBehavior])
  type: Type<ClientType>;

  @formGroup()
  address: Address;

  @formArray(null, Client.testArrayBehavior)
  cards: TypeArray<Card>;

  private static clientTypeBehavior(control: Type<ClientType>, client: Client): void {
    switch (control.value) {
      case ClientType.Business:
        client.businessName.enable();
        client.vatNumber.enable();
        break;
      case ClientType.Private:
        client.businessName.disable();
        client.vatNumber.disable();
        break;
    }
  }

  private static testArrayBehavior(control: TypeArray<Card>, client: Client): void {
    console.log(control.value);
  }
}

@form
export class Card extends FormGroup {

  constructor(cardNumber?: string) {
    super();
    this.cardNumber = cardNumber as TypeString;
    this.expiry = moment() as Type<Moment>;
    this.cvv = null as TypeNumber;
  }

  @formControl([Validators.required])
  cardNumber: TypeString;

  @formControl()
  expiry: Type<Moment>;

  @formControl()
  cvv: TypeNumber;
}


