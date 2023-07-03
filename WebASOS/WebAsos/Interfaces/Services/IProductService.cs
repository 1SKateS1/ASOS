﻿using WebAsos.Data.Entitties.DTO;
using WebAsos.Models;
using WebAsos.Services;

namespace WebAsos.Interfaces.Services
{
    public interface IProductService
    {
        public Task<ServiceResponse> GetProductAsync(string name);
        public Task<ServiceResponse> GetProductByIdAsync(int id);
        public Task<ServiceResponse> CreateProductAsync(CreateProductDTO model);
        public Task<ServiceResponse> GetProductsAsync();
        public Task<ServiceResponse> GetProductByCategoryId(int id);
        public Task DeleteProductAsync(int id);
        public Task<ServiceResponse> UpdateProductAsync(UpdateProductDTO model);
    }
}
