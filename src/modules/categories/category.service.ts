import type { CreateCategoryDto } from './dto/create-category.dto'

export class CategoryService {
  private categories = [
    {
      id: 1,
      name: 'Households',
      description: 'Home appliances',
      isActive: true,
    },
    {
      id: 2,
      name: 'Laptops',
      description: 'All kinds of laptops',
      isActive: true,
    },
    {
      id: 3,
      name: 'Phones',
      description: 'Smartphones and accessories',
      isActive: false,
    },
    { id: 4, name: 'Books', description: 'All kinds of books', isActive: true },
  ]
  // var for next id
  private nextId = 5

  // show all categories
  getAll() {
    return this.categories
  }

  // show one category by id
  getOne(id: number) {
    return this.categories.find((cat) => cat.id === id)
  }

  // add a new category
  create(params: CreateCategoryDto) {
    const newCategory = {
      id: this.nextId++,
      name: params.name,
      description: params.description,
      //default --> false
      isActive: params.isActive ?? false,
    }
    // add new cat in our arr
    this.categories.push(newCategory)
    return newCategory
  }

  // change the category by id
  update(id: number, params: Partial<CreateCategoryDto>) {
    const category = this.getOne(id)
    if (!category) return null
    // update with new params
    Object.assign(category, params)
    return category
  }

  // delete the category by id
  delete(id: number) {
    const idx = this.categories.findIndex((cat) => cat.id === id)
    if (idx === -1) return null
    const [deleted] = this.categories.splice(idx, 1)
    return deleted
  }
}