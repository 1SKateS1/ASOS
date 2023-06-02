﻿using System;
using AutoMapper;
using WebAsos.Data.Entitties.Catalog;
using WebAsos.Data.Entitties.IdentityUser;
using WebAsos.Data.ViewModels.User;
using WebAsos.Models;

namespace WebAsos.Data.AutoMapper.User
{
	public class AutoMapperUserProfile : Profile
    {
		public AutoMapperUserProfile()
		{
            CreateMap<RegisterUserProfileViewModal, UserEntity>().ForMember(dst => dst.UserName, act => act.MapFrom(src => src.Email));

            CreateMap<CategoryEntity, CategoryViewModel>();

            CreateMap<CategoryEntity, CategoryCreateViewModel>();
            CreateMap<CategoryCreateViewModel, CategoryEntity>()
                .ForMember(c => c.Childrens, opt => opt.Ignore())
                .ForMember(c => c.ParentId, opt => opt.Ignore())
                .ForMember(c => c.Parent, opt => opt.Ignore());

            CreateMap<CategoryUpdateViewModel, CategoryEntity>();
            CreateMap<CategoryEntity, CategoryUpdateViewModel>();

            CreateMap<CategoryEntity, CategoryGroupViewModel>();
            CreateMap<RegisterUserProfileViewModel, UserEntity>().ForMember(dst => dst.UserName, act => act.MapFrom(src => src.Email));  
        }
	}
}

