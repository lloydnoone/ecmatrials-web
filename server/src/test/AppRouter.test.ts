import express from 'express'
import { AppRouter } from '../app/AppRouter'

describe('AppRouter test suite', () => {
  test('Should return an instance of an express router', () => {
    const instance = AppRouter.getInstance()
    setTimeout(() => {
      expect(instance).toBeInstanceOf(express.Router())
    }, 1000)
  })
})