import { Component, OnInit } from '@angular/core';
import { Card, Client, ClientType } from './client.form';
import { TypeString } from '../../../object-oriented-reactive-forms/src';

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
    this.form.fullName = 'test test' as TypeString;
  }

  addCard() {
    this.form.cards.push(new Card('0000001234'));
  }
}
