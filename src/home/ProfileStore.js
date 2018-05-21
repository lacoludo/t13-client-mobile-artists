import { observable, computed } from "mobx";

import { Firebase } from "../components";
import type { Profile } from "../components/Model";

const DEFAULT_PROFILE: Profile = {
  name: "Anonymous",
  outline: "React Native",
  picture: {
    uri:
      "https://media.licdn.com/dms/image/C4E03AQHZ5kAxawJlog/profile-displayphoto-shrink_200_200/0?e=1531958400&v=beta&t=JQZ9KK4xOZp2gWS27bFJQcBcYsYdGxjO9-4tYQz2b_Q",
    preview:
      "data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
  }
};

export default class ProfileStore {
  @observable _profile: Profile = DEFAULT_PROFILE;

  @computed
  get profile(): Profile {
    return this._profile;
  }
  set profile(profile: Profile) {
    this._profile = profile;
  }

  async init(): Promise<void> {
    const { uid } = Firebase.auth.currentUser;
    Firebase.firestore
      .collection("users")
      .doc(uid)
      .onSnapshot(async snap => {
        if (snap.exists) {
          this.profile = snap.data();
        } else {
          await Firebase.firestore
            .collection("users")
            .doc(uid)
            .set(DEFAULT_PROFILE);
          this.profile = DEFAULT_PROFILE;
        }
      });
  }
}
