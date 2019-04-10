import { Component, OnInit } from '@angular/core';
import { Card, Client, ClientType } from './client.form';
import { TypeString } from '../../../reactive-forms-annotations/src';

import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  form: Client;
  ClientType = ClientType;

  constructor() {
    this.form = new Client();

  }

  ngOnInit(): void {
    this.form.fullName = 'Test Name' as TypeString;

  }

  chosenYearHandler(normalizedYear: Moment, index: number) {
    const ctrlValue = this.form.cards.at(index).expiry.value;
    ctrlValue.year(normalizedYear.year());
    this.form.cards.at(index).expiry = ctrlValue;
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number) {
    const ctrlValue = this.form.cards.at(index).expiry.value;
    ctrlValue.month(normalizedMonth.month());
    this.form.cards.at(index).expiry = ctrlValue;
    datepicker.close();
  }

  addCard() {
    this.form.cards.push(new Card());
  }

  removeCard(index: number) {
    this.form.cards.removeAt(index);
  }

  submit() {
    console.log(this.form);
  }
}
