import { assert } from 'chai';

import { TestFactory } from '../../../test/factory';

import { UserInvitation } from './model';

describe('Testing user-invitation component', () => {
	const factory: TestFactory = new TestFactory();
	const testInvitation: UserInvitation = UserInvitation.mockTestUserInvitation();

	before(async () => {
		await factory.init();
	});

	after(async () => {
		await factory.close();
	});

	describe('POST /user-invitations', () => {
		it('responds with status 400', (done) => {
			factory.app
				.post('/api/v1/user-invitations')
				.send()
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400, done);
		});

		it('responds with new user-invitations', (done) => {
			factory.app
				.post('/api/v1/user-invitations')
				.send({
					email: testInvitation.email,
					hash: testInvitation.hash,
					active: testInvitation.active
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const invitation: UserInvitation = res.body;

						assert.isObject(invitation, 'userInvitation should be an object');

						assert(invitation.email === testInvitation.email, 'email does not match');
						assert(invitation.hash === testInvitation.hash, 'hash does not match');
						assert(invitation.active === testInvitation.active, 'active does not match');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('GET /user-invitations', () => {
		it('responds with user-invitations array', (done) => {
			factory.app
				.get('/api/v1/user-invitations')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const invitations: UserInvitation[] = res.body;

						assert.isArray(invitations, 'invitations shoud be an array');
						assert(invitations[0].email === testInvitation.email, 'email does not match');
						assert(invitations[0].hash === testInvitation.hash, 'hash does not match');
						assert(invitations[0].active === testInvitation.active, 'active does not match');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('GET /user-invitations/1', () => {
		it('responds with user-invitation', (done) => {
			factory.app
				.get('/api/v1/user-invitations/1')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const invitation: UserInvitation = res.body;

						assert.isObject(invitation, 'invitations shoud be an object');
						assert(invitation.email === testInvitation.email, 'email does not match');
						assert(invitation.hash === testInvitation.hash, 'hash does not match');
						assert(invitation.active === testInvitation.active, 'active does not match');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});
});
