import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      include: { children: true },
      orderBy: { name: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { children: true, products: true },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        parentId: dto.parentId,
      },
    });
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug: dto.slug,
        parentId: dto.parentId,
      },
    });
  }

  delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }

  countProducts(categoryId: string) {
    return this.prisma.productCategory.count({ where: { categoryId } });
  }
}
