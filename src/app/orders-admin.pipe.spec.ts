import { OrdersAdminPipe } from './orders-admin.pipe';

describe('OrdersAdminPipe', () => {
  it('create an instance', () => {
    const pipe = new OrdersAdminPipe();
    expect(pipe).toBeTruthy();
  });
});
