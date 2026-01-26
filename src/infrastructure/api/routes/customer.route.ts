import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer.repository'
import CustomerPresenter from '../presenters/customer.presenter'
import FindCustomerUseCase from '../../../usecase/customer/find/find.customer.usecase'
import UpdateCustomerUseCase from '../../../usecase/customer/update/update.customer.usecase'
import DeleteCustomerUseCase from '../../../usecase/customer/delete/delete.customer.usecase'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    }
    const output = await usecase.execute(customerDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository())
  const output = await usecase.execute()

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.listXML(output)),
  })
})

customerRoute.get('/:id', async (req: Request, res: Response) => {
  const usecase = new FindCustomerUseCase(new CustomerRepository())
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const output = await usecase.execute({ id })

    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.singleXML(output)),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

customerRoute.put('/:id', async (req: Request, res: Response) => {
  const usecase = new UpdateCustomerUseCase(new CustomerRepository())
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const input = {
      id: id,
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    }
    const output = await usecase.execute(input)

    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.singleXML(output)),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

customerRoute.delete('/:id', async (req: Request, res: Response) => {
  const usecase = new DeleteCustomerUseCase(new CustomerRepository())
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    await usecase.execute({ id })
    res.status(204).send()
  } catch (err) {
    res.status(500).send(err)
  }
})
