import {collection, deleteField, getDocs, limit, onSnapshot, query, where} from 'firebase/firestore';
import {firestore} from '../../config/firebase';
import {createOrUpdateDoc, getDocument} from './index';
import {IUser, UserFullData, UserRoles} from "../../shared/user";

export const USERS = 'users';
const USER = (userId: string) => `${USERS}/${userId}`;

export const getUser = (userId: string) => <Promise<UserFullData>>getDocument(USER(userId));

export async function getAdmins(setUsers: Function, setIsLoading: Function, etiEventId?: string) {
    const ref = collection(firestore, USERS);

    const isAdminOfEvent = where('adminOf', 'array-contains', etiEventId);
    let q;
    if (etiEventId) {
        q = query(ref, isAdminOfEvent);
    } else {
        q = query(ref, where('roles', '!=', null));
    }

    return onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as UserFullData[];

        setUsers(docs);
        setIsLoading(false);
    });
}

const getUserByEmail = async (email: string) => {
    const ref = collection(firestore, USERS);
    const q = query(ref, where('email', '==', email), limit(1));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as UserFullData[];
    return docs[0];
};

export async function assignSuperAdmin(email: string) {
    const doc = await getUserByEmail(email);
    return createOrUpdateDoc(USERS, {roles: {[UserRoles.SUPER_ADMIN]: true}}, doc.id);
}

export async function removeSuperAdmin(email: string) {
    const userDoc = await getUserByEmail(email);
    return createOrUpdateDoc(
        USERS,
        {roles: {[UserRoles.SUPER_ADMIN]: deleteField()}},
        userDoc.id
    );
}

export const isAdmin = (user: IUser) => {
    // @ts-ignore
    return !!Object.values(user?.data?.roles || {}).filter((v) => v).length > 0;
};

export const isSuperAdmin = (user: IUser) => {
    // @ts-ignore
    return !!user?.data?.roles && !!user?.data?.roles[UserRoles.SUPER_ADMIN];
};

