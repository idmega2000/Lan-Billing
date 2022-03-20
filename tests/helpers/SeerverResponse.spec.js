import { expect } from 'chai';
import ServerResponses from 'utilities/ServerResponses';
import sinon, { stub, spy } from 'sinon';
import { RESPONSE_MESSAGE } from 'utilities/Constants';

describe('Server response Helper function', () => {
  afterEach(() => sinon.restore());
  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.response(res, { status: RESPONSE_MESSAGE.OK });
    expect(res.status.called).to.be.true;
    expect(status.calledWith(200)).to.be.true;
  });
  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.response(res, { Error: RESPONSE_MESSAGE.NO_FEE_DATA }, 400);
    expect(res.status.called).to.be.true;
    expect(status.calledWith(400)).to.be.true;
  });
});
