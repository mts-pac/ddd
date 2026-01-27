import express, { Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'
import ProductPresenter from '../presenters/product.presenter'
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase'
import FindProductUseCase from '../../../usecase/product/find/find.product.usecase'
import UpdateProductUseCase from '../../../usecase/product/update/update.product.usecase'
import DeleteProductUseCase from '../../../usecase/product/delete/delete.product.usecase'

export const route = express.Router()

route.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())
  try {
    const input = {
      name: req.body.name,
      price: req.body.price,
    }
    const output = await usecase.execute(input)
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.singleXML(output)),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

route.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())
  try {
    const output = await usecase.execute()
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.listXML(output)),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

route.get('/:id', async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository())
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const output = await usecase.execute({ id })
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.singleXML(output)),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

route.put('/:id', async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository())
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const input = {
      id,
      name: req.body.name,
      price: req.body.price,
    }
    const output = await usecase.execute(input)
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.singleXML(output)),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

route.delete('/:id', async (req: Request, res: Response) => {
  const usecase = new DeleteProductUseCase(new ProductRepository())
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    await usecase.execute({ id })
    res.status(204).send()
  } catch (err) {
    res.status(500).send(err)
  }
})
