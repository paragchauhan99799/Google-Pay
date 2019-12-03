import { Component } from '@angular/core';

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example',
    'gatewayMerchantId': 'exampleGatewayMerchantId'
  }
};

const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  paymentsClient: any;

  constructor(){}

  ngOnInit() {
    this.loadGooglrPay();
    setTimeout(() => {
      this.initGoogleInstance();
    }, 2000);
  }

  loadGooglrPay(): void {
    const paySrc = 'https://pay.google.com/gp/p/js/pay.js';
    let isLoaded = false;
    let scripts:NodeListOf<Element> = document.getElementsByTagName('script');
    for(let i=0; i < scripts.length; i++) {
        if (scripts[i].getAttribute('src') == paySrc) isLoaded = true;
    }
    if (isLoaded) return;
    let stripeNode = document.createElement('script');
    stripeNode.src = paySrc;
    stripeNode.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(stripeNode);
  }

  initGoogleInstance() {
    this.paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST'
  });
  }
}
