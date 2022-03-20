import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import FeeConfigRepository from 'repository/FeeConfigRepository';
import { RESPONSE_MESSAGE } from 'utilities/Constants';
import url from '../../src/index';
import {
  feeConfigData, feeConfSpec,
  transactionData
} from '../mock/feeConfig';

chai.use(chaiHttp);

describe('API endpoint for Fee config', () => {
  describe('Endpoint to add fee config', () => {
    beforeEach(async () => {
      sinon.stub(FeeConfigRepository, 'create').returns(
        feeConfigData[0]
      );
    });

    afterEach(() => sinon.restore());

    it('it should return a error response if FeeConfigurationSpec is not passed',
      () => chai.request(url)
        .post('/fees')
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.body.Error).to.equal(RESPONSE_MESSAGE.NO_FEE_DATA);
        }));
    it('it should return a success if successful',
      () => chai.request(url)
        .post('/fees')
        .send(feeConfSpec)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body.status).to.equal(RESPONSE_MESSAGE.OK);
        }));
  });
  describe('Endpoints to get billing config', () => {
    beforeEach(async () => {
      sinon.stub(FeeConfigRepository, 'findBy').returns(feeConfigData);
    });
    afterEach(() => sinon.restore());
    it('it should return a error response if transaction data is not passed',
      () => chai.request(url)
        .post('/compute-transaction-fee')
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.body.Error).to.equal(RESPONSE_MESSAGE.NO_TRANSACTION_DATA);
        }));
    it('it should return success response if billing data is found',
      () => chai.request(url)
        .post('/compute-transaction-fee')
        .send(transactionData)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body.AppliedFeeID).to.equal('LNPY1222');
        }));
  });
});
