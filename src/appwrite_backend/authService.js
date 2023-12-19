import config from '../config/config.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(config.appWriteUrl)
			.setProject(config.appWriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name,
			);

			if (userAccount) {
				//call another method
				return this.logIn({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async logIn({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			await this.account.get();
		} catch (error) {
			throw error;
		}
		return null;
	}

	async logOut() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
}

const authServices = new AuthService();
export default authServices;
