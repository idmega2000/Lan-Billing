import { expect } from 'chai';
import ServerResponses from 'helpers/ServerResponses';
import sinon, { stub, spy } from 'sinon';

describe('Server response Helper function', () => {
  afterEach(() => sinon.restore());
  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.successOk(res, 'hello', {});
    expect(res.status.called).to.be.true;
    expect(status.calledWith(200)).to.be.true;
  });
  it('it should return success for success ok method', async () => {
    const status = stub();
    const json = spy();
    const req = { body: stub(), headers: stub(), userProcessor: stub() };
    const res = { json, status, req };
    status.returns(res);
    await ServerResponses.appError(res, 'hello');
    expect(res.status.called).to.be.true;
    expect(status.calledWith(400)).to.be.true;
  });
});
