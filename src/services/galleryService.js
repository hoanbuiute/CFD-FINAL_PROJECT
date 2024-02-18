import axiosInstance from "../utils/axiosInstance";

export const galleryService = {
    getGallery(query = "") {
      return axiosInstance.get(`/galleries${query}`);
    },
    getGalleryBySlug(slug = "") {
      return axiosInstance.get(`/galleries${slug}`);
    },
  };