import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list nearby gyms', async () => {

    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'JavaScript Gym',
      description: 'Some description',
      phone: '9999999999',
      latitude: -27.0747279,
      longitude: -49.4889672
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'TypeScript Gym',
      description: 'Some description',
      phone: '9999999999',
      latitude: -27.0610928,
      longitude: -49.6481091
    })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.0747279,
        longitude: -49.4889672
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym'
      })
    ])
  })
})
