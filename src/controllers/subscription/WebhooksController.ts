import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../../utils/stripe';

import { saveSubscription } from '../../utils/manageSubscription';

class WebhooksController {
  async handle(request: Request, response: Response) {
    let event: Stripe.Event = request.body;

    let endpointSecret: '';

    if (endpointSecret) {
      const signature = request.headers['stripe-signature'];

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (error) {
        console.log('Webhook signature failed', error.message);
        return response.sendStatus(400);
      }
    }

    switch (event.type) {
      case 'customer.subscription.deleted':
        // caso ele cancele sua assinatura vamos deletar a assinatura do cliente
        const payment = event.data.object as Stripe.Subscription;

        await saveSubscription(payment.id, payment.customer.toString(), true);
        break;
      case 'customer.subscription.updated':
        // Caso tenha alguma atualizaçao na assinatura
        const paymentIntent = event.data.object as Stripe.Subscription;

        await saveSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false
        );
        break;
      case 'checkout.session.completed':
        // Criar a assinatura por que foi pago com sucesso!
        const checkoutSession = event.data.object as Stripe.Checkout.Session;

        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true
        );

        break;

      default:
        console.log(`Evento desconhecido ${event.type}`);
        break;
    }
  }
}

export { WebhooksController };
