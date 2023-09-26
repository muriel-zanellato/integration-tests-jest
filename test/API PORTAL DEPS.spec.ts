import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('API PORTAL DEPS', () => {
  let acess_token = '';
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://qa-atual-portal-api.deps.com.br'; //link da API que estou apontando...

  p.request.setDefaultTimeout(60000);

  beforeEach(async () => {
    acess_token = await p
      .spec()
      .post(`${baseUrl}/api/v1/conta/entrar`)
      .withJson({
        email: 'gestor@almeria.com.br',
        senha: 'Muri@321'
      })
      .expectStatus(StatusCodes.OK)
      .returns('acess_token')
      .inspect();
  });

  describe('Portes', () => {
    it('Criar porte', async () => {
      await p
        .spec()
        .post(`${baseUrl}/api/v1/porte/padrao`)
        .withHeaders('Authorization', acess_token)
        .withJson({
          clienteId: '5b8023f4-edf7-4790-ada7-a4f29bbeb228'
        })
        .expectStatus(StatusCodes.OK);
    });
  });
});
