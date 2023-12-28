import config from '../config/config.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Services {
	client = new Client();
	database;
	storage;

	constructor() {
		this.client
			.setEndpoint(config.appWriteUrl)
			.setProject(config.appWriteProjectId);
		this.database = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.database.createDocument(
				config.appWriteDatabaseId,
				config.appWriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				},
			);
		} catch (error) {
			throw error;
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.database.updateDocument(
				config.appWriteDatabaseId,
				config.appWriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				},
			);
		} catch (error) {
			throw error;
		}
	}

	async deletePost(slug) {
		try {
			await this.database.deleteDocument(
				config.appWriteDatabaseId,
				config.appWriteCollectionId,
				slug,
			);
			return true;
		} catch (error) {
			throw error;
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.database.getDocument(
				config.appWriteDatabaseId,
				config.appWriteCollectionId,
				slug,
			);
		} catch (error) {
			throw error;
			return false;
		}
	}

	async getPosts(queries = [Query.equal('status', 'active')]) {
		try {
			return await this.document.listDocuments(
				config.appWriteDatabaseId,
				config.appWriteCollectionId,
				queries,
			);
		} catch (error) {
			throw error;
			return false;
		}
	}

	//for file upload,
	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				config.appWriteBucketId,
				ID.unique(),
				file,
			);
		} catch (error) {
			throw error;
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(config.appWriteBucketId, fileId);
			return true;
		} catch (error) {
			throw error;
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(config.appWriteBucketId, fileId);
	}
}

const services = new Services();

export default services;
