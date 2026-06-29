import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Request } from 'express';
import { ForwardedIdentityGuard, RolesGuard, Roles } from '@app/auth';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  async listCategories(@Req() req: Request) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.categoryService.listCategories();
    return { data, meta: { correlationId } };
  }

  @Post()
  @UseGuards(ForwardedIdentityGuard, RolesGuard)
  @Roles('admin')
  @ApiSecurity('x-user-id')
  @ApiSecurity('x-user-roles')
  @ApiOperation({ summary: 'Create category (admin)' })
  async createCategory(@Body() dto: CreateCategoryDto, @Req() req: Request) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.categoryService.createCategory(dto);
    return { data, meta: { correlationId } };
  }

  @Patch(':id')
  @UseGuards(ForwardedIdentityGuard, RolesGuard)
  @Roles('admin')
  @ApiSecurity('x-user-id')
  @ApiSecurity('x-user-roles')
  @ApiOperation({ summary: 'Update category (admin)' })
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @Req() req: Request,
  ) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.categoryService.updateCategory(id, dto);
    return { data, meta: { correlationId } };
  }

  @Delete(':id')
  @UseGuards(ForwardedIdentityGuard, RolesGuard)
  @Roles('admin')
  @ApiSecurity('x-user-id')
  @ApiSecurity('x-user-roles')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete category (admin)' })
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
  }
}
