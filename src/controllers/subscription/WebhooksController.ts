import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../../utils/stripe';

class WebhooksController {
  async handle(request: Request, response: Response) {
    let event: Stripe.Event = request.body;

    let endpointSecret: 'whsec_dde364726c0dfd4799506a1fc165e667c7c117ad865e340000cfe11dee79b849';

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
        break;
      case 'customer.subscription.updated':
        // Caso tenha alguma atualizaçao na assinatura
        break;
      case 'checkout.session.completed':
        // Criar a assinatura por que foi pago com sucesso!
        break;

      default:
        console.log(`Evento desconhecido ${event.type}`);
        break;
    }
  }
}

export { WebhooksController };
