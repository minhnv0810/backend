import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  listCategories() {
    return this.repo.findAll();
  }

  async createCategory(dto: CreateCategoryDto) {
    const existing = await this.repo.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictException({
        error: { code: 'SLUG_ALREADY_EXISTS', message: `Slug ${dto.slug} already exists` },
      });
    }
    return this.repo.create(dto);
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new NotFoundException({
        error: { code: 'CATEGORY_NOT_FOUND', message: `Category ${id} not found` },
      });
    }
    return this.repo.update(id, dto);
  }

  async deleteCategory(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new NotFoundException({
        error: { code: 'CATEGORY_NOT_FOUND', message: `Category ${id} not found` },
      });
    }

    const productCount = await this.repo.countProducts(id);
    if (productCount > 0) {
      throw new ConflictException({
        error: {
          code: 'CATEGORY_HAS_PRODUCTS',
          message: `Category ${id} has ${productCount} associated products`,
        },
      });
    }

    return this.repo.delete(id);
  }
}
