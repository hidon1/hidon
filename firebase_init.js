
    <script type="module">
      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
      import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js"; 
      import { getDatabase, ref, set, get, query, orderByChild, limitToLast, onValue, update } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

      const firebaseConfig = {
        apiKey: "AIzaSyABKn0GfHYi_1UG_0sfSn68CNNz4Q9nS7g",
        authDomain: "hidon1.com",
        databaseURL: "https://hidon1-e4c91-default-rtdb.firebaseio.com",
        projectId: "hidon1-e4c91",
        storageBucket: "hidon1-e4c91.appspot.com",
        messagingSenderId: "411517496015",
        appId: "1:411517496015:web:2d9c176783d062110465ba",
        measurementId: "G-FWTSZNY72T"
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getDatabase(app);
      let currentUser = null;

      // ייצא את Firebase APIs ו-currentUser ל-window כדי שסקריפטים רגילים יוכלו לגשת אליהם
      window.firebase = {
        app: app,
        auth: { // ייצא את auth ושירותים ספציפיים מתוכו
            getAuth: () => auth,
            onAuthStateChanged: onAuthStateChanged,
            updateProfile: updateProfile,
            currentUser: currentUser // יש לעדכן את זה בפונקציית onAuthStateChanged
        },
        database: { // ייצא את db ושירותים ספציפיים מתוכו
            getDatabase: () => db,
            ref: ref,
            set: set,
            get: get,
            query: query,
            orderByChild: orderByChild,
            limitToLast: limitToLast,
            onValue: onValue,
            update: update
        }
      };

      onAuthStateChanged(auth, (user) => {
        currentUser = user;
        window.currentUser = user; // עדכן את currentUser הגלובלי גם כן
        window.firebase.auth.currentUser = user; // וודא שגם בתוך window.firebase.auth ה-currentUser מעודכן
        if (user && document.getElementById('user-info-container').style.display === 'block') {
            window.firebase_store.loadUserData();
        }
      });
      
      const firebase_store = {
        coins: 0,
        userAvatar: 'images/default-avatar.png',
        ownedAvatars: ['images/default-avatar.png'], 
        storeItems: [],

        initStoreItems() {
            this.storeItems = [];
            for (let i = 1; i <= 20; i++) {
                this.storeItems.push({
                    id: `avatar_${i}`, 
                    name: `סמל ${i}`,
                    price: i * 200,
                    image: `images/${i}.png`
                });
            }
        },
        async loadUserData() {
            const defaultAvatar = 'images/default-avatar.png';
            if (!currentUser) {
                this.coins = parseInt(localStorage.getItem('userCoins') || '0', 10);
                this.userAvatar = localStorage.getItem('userAvatar') || defaultAvatar;
                this.ownedAvatars = JSON.parse(localStorage.getItem('ownedAvatars') || `["${defaultAvatar}"]`);
            } else {
                const userRef = ref(db, 'users/' + currentUser.uid);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        this.coins = data.coins || 0;
                        this.userAvatar = data.avatar || defaultAvatar;
                        this.ownedAvatars = data.ownedAvatars || [defaultAvatar]; 
                        if (!data.displayName && currentUser.displayName) {
                            await update(userRef, { displayName: currentUser.displayName });
                        }
                  } else {
                        // המשתמש קיים באימות (Auth), אך אין לו רשומה ב-Realtime Database.
                        // צור רשומה חדשה עבור המשתמש הזה ב-DB.
                        console.warn("המשתמש קיים באימות, אך לא במסד הנתונים בזמן אמת. יצירת רשומה חדשה."); //
                        await set(userRef, {
                            displayName: currentUser.displayName || "משתמש חדש", // קח את השם מפרופיל Auth או ברירת מחדל
                            coins: 0, // התחל עם 0 מטבעות
                            avatar: currentUser.photoURL || defaultAvatar, // קח את תמונת הפרופיל מ-Auth או ברירת מחדל
                            ownedAvatars: [currentUser.photoURL || defaultAvatar] //
                        });
                        // עדכן את המצב המקומי של האובייקט firebase_store
                        this.coins = 0; //
                        this.userAvatar = currentUser.photoURL || defaultAvatar; //
                        this.ownedAvatars = [currentUser.photoURL || defaultAvatar]; //
                        console.log("נוצרה רשומה חדשה למשתמש במסד הנתונים."); //
                    }
                } catch(error) {
                    console.error("שגיאת טעינת בסיס נתונים:", error); // Translated
                    this.coins = parseInt(localStorage.getItem('userCoins') || '0', 10);
                    this.userAvatar = localStorage.getItem('userAvatar') || defaultAvatar;
                    this.ownedAvatars = JSON.parse(localStorage.getItem('ownedAvatars') || `["${defaultAvatar}"]`);
                }
            }
            this.updateUIAfterDataLoad();
        },
        updateUIAfterDataLoad() {
            document.getElementById("coin-display").textContent = this.coins;
            document.getElementById("store-coin-display").textContent = this.coins;
            document.getElementById('user-avatar').src = this.userAvatar;

            // --- Added username update ---
            if (currentUser && currentUser.displayName) {
                document.getElementById('username-display').textContent = currentUser.displayName;
            } else {
                document.getElementById('username-display').textContent = "בחר שם"; // Translated
            }

            window.score = parseInt(localStorage.getItem('userScore') || '0', 10);
            window.updateScore(0);
        },

        saveUserDataToDB() {
            localStorage.setItem('userCoins', this.coins);
            localStorage.setItem('userAvatar', this.userAvatar);
            localStorage.setItem('ownedAvatars', JSON.stringify(this.ownedAvatars));

            if (!currentUser) return;

            if (currentUser.displayName) {
                localStorage.setItem('userDisplayName', currentUser.displayName);
            }

            const userRef = ref(db, 'users/' + currentUser.uid);
            
            const updates = {
                coins: this.coins,
                avatar: this.userAvatar,
                ownedAvatars: this.ownedAvatars
            };
            
            if (currentUser.displayName) {
                updates.displayName = currentUser.displayName;
            }

            update(userRef, updates).catch(error => console.error("שגיאת שמירה בבסיס נתונים:", error)); // Translated
        },
                
        async updateCoins(change) {
            if (!currentUser) {
                this.coins += change;
                if (this.coins < 0) this.coins = 0;
                localStorage.setItem('userCoins', this.coins);
                document.getElementById("coin-display").textContent = this.coins;
                document.getElementById("store-coin-display").textContent = this.coins;
                return;
            }

            const userRef = ref(db, 'users/' + currentUser.uid);
            try {
                const snapshot = await get(userRef);
                let currentCoins = 0;
                if (snapshot.exists()) {
                    currentCoins = snapshot.val().coins || 0;
                }

                const newCoins = currentCoins + change;
                this.coins = newCoins < 0 ? 0 : newCoins; 

                await update(userRef, { coins: this.coins });
                
                document.getElementById("coin-display").textContent = this.coins;
                document.getElementById("store-coin-display").textContent = this.coins;
                localStorage.setItem('userCoins', this.coins);

            } catch (error) {
                console.error("שגיאה קריטית בעדכון המטבעות:", error); // Translated
                alert("אירעה שגיאה בסנכרון הנקודות. אנא רענן את העמוד."); // Translated
            }
        },
        handleItemClick(item) {
            const isOwned = this.ownedAvatars.includes(item.image);

            if (isOwned) {
                this.userAvatar = item.image;
                document.getElementById('user-avatar').src = this.userAvatar;
                this.saveUserDataToDB();
                this.closeStore();
                alert('הסמל הוחלף בהצלחה!'); // Translated
            } else {
                if (this.coins >= item.price) {
                    this.updateCoins(-item.price);
                    this.userAvatar = item.image;
                    this.ownedAvatars.push(item.image);
                    
                    document.getElementById('user-avatar').src = this.userAvatar;
                    this.saveUserDataToDB();
                    alert(`קנית את ${item.name}!`); // Translated
                    this.closeStore();
                } else {
                    alert('אין לך מספיק מטבעות.'); // Translated
                }
            }
        },
        
        openStore() {
            this.populateStore();
            document.getElementById('store-overlay').classList.add('visible');
        },

        closeStore() {
            document.getElementById('store-overlay').classList.remove('visible');
        },

        populateStore() {
            const itemsContainer = document.getElementById('store-items');
            itemsContainer.innerHTML = '';
            if (!Array.isArray(this.ownedAvatars)) this.ownedAvatars = [];
            document.getElementById("store-coin-display").textContent = this.coins;

            this.storeItems.forEach(item => {
                const isOwned = this.ownedAvatars.includes(item.image);
                const isEquipped = this.userAvatar === item.image;

                const itemDiv = document.createElement('div');
                itemDiv.className = 'store-item';
                if (isEquipped) {
                    itemDiv.classList.add('equipped');
                } else if (isOwned) {
                    itemDiv.classList.add('owned');
                }

                let priceOrStatus;
                if (isOwned) {
                    priceOrStatus = `<p class="item-status">${isEquipped ? 'נבחר' : 'בחר'}</p>`; // Translated
                } else {
                    priceOrStatus = `<div class="item-price">${item.price}<img src="images/coin-icon.png" alt="מטבע"></div>`;
                }

                // Corrected image loading: use item.image directly for src
                // Added a fallback for image loading using onerror
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/80x80/cccccc/000000?text=Error'"> 
                    <p class="item-name">${item.name}</p>
                    ${priceOrStatus}
                `;
                
                itemDiv.onclick = () => this.handleItemClick(item);
                itemsContainer.appendChild(itemDiv);
            });
        }
      };
      
      firebase_store.initStoreItems();
      window.firebase_store = firebase_store;

        function setupLeaderboard() {
            const leaderboardContainer = document.getElementById('leaderboard-container');
            if (leaderboardContainer) {
                leaderboardContainer.style.display = 'block';
            }

            const usersRef = ref(db, 'users');
            const topUsersQuery = query(usersRef, orderByChild('coins'), limitToLast(50)); 

            onValue(topUsersQuery, (snapshot) => {
                const leaderboardList = document.getElementById('leaderboard-list');
                const fullLeaderboardList = document.getElementById('full-leaderboard-list');

                if (!leaderboardList || !fullLeaderboardList) return;

                leaderboardList.innerHTML = ''; 
                fullLeaderboardList.innerHTML = '';

                if (snapshot.exists()) {
                    let users = [];
                    snapshot.forEach((childSnapshot) => {
                        users.unshift({ key: childSnapshot.key, ...childSnapshot.val() });
                    });

                    users.forEach((user, index) => {
                        const displayName = user.displayName || 'משתמש'; // Translated
                        const avatar = user.avatar || 'images/default-avatar.png';
                        const coins = user.coins || 0;

                        const smallRow = document.createElement('div');
                        smallRow.className = 'leaderboard-row';
                        smallRow.innerHTML = `
                            <span>${index + 1}.</span>
                            <img src="${avatar}" alt="${displayName}">
                            <span class="leaderboard-name">${displayName}</span>
                            <span class="leaderboard-coins">${coins}</span>
                        `;
                        leaderboardList.appendChild(smallRow);

                        const fullRow = document.createElement('div');
                        fullRow.className = 'full-leaderboard-row';
                        fullRow.innerHTML = `
                            <span class="full-leaderboard-rank">${index + 1}.</span>
                            <img src="${avatar}" alt="${displayName}" class="full-leaderboard-avatar">
                            <span class="full-leaderboard-name">${displayName}</span>
                            <span class="full-leaderboard-coins">
                                ${coins} <img src="images/coin-icon.png" alt="מטבע">
                            </span>
                        `;
                        fullLeaderboardList.appendChild(fullRow);
                    });
                } else {
                    leaderboardList.innerHTML = '<div>אין נתונים</div>'; // Translated
                    fullLeaderboardList.innerHTML = '<div>אין נתונים להצגה</div>'; // Translated
                }
            });
        }
        window.setupLeaderboard = setupLeaderboard;

        function openAuthBanner() {
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('authOverlay').style.display = 'block';
            document.getElementById('authFrame').src = "auth.html";
        }

        window.addEventListener("message", function(event) {
            if(event.data === "authComplete") {
                document.getElementById('authOverlay').style.display = 'none';
                document.getElementById('authFrame').src = "";
                showStageIntro();
            }
        });
        window.openAuthBanner = openAuthBanner;
        // ===== New functions for username change management =====

        function openUsernameChangeModal() {
            const overlay = document.getElementById('username-change-overlay');
            const input = document.getElementById('new-username-input');
            const errorMsg = document.getElementById('username-change-error');

            if (!window.currentUser) {
                alert("עליך להיות מחובר כדי לשנות את שם המשתמש."); // Translated
                return;
            }

            input.value = window.currentUser.displayName || '';
            errorMsg.textContent = '';
            overlay.classList.add('visible');
        }
        // פונקציה ליצירת חדר עבור משחק אקראי (נתמך ב-h2h.html)
        function startRandomMatch() {
            if (!window.currentUser) {
                alert('עליך להתחבר כדי למצוא יריב אקראי.');
                return;
            }
            window.location.href = 'h2h.html?mode=random';
        }

        function closeUsernameChangeModal() {
            document.getElementById('username-change-overlay').classList.remove('visible');
        }

        async function saveNewUsername() {
            if (!window.currentUser) return; // השתמש ב-window.currentUser

            const input = document.getElementById('new-username-input');
            const errorMsg = document.getElementById('username-change-error');
            const newName = input.value.trim();

            if (!newName || newName.length < 2) {
                errorMsg.textContent = "שם המשתמש חייב להכיל לפחות 2 תווים."; // Translated
                return;
            }

            errorMsg.textContent = '';
            document.getElementById('save-username-btn').disabled = true;
            document.getElementById('save-username-btn').textContent = "שומר..."; // Translated

            try {
                await updateProfile(currentUser, { displayName: newName });

                const userRef = ref(db, 'users/' + currentUser.uid);
                await update(userRef, { displayName: newName });

                document.getElementById('username-display').textContent = newName;

                alert("שם המשתמש עודכן בהצלחה!"); // Translated
                closeUsernameChangeModal();

            }  catch (error) {
                console.error("שגיאה בעדכון שם המשתמש:", error); // Translated
                errorMsg.textContent = "אירעה שגיאה. נסה שוב."; // Translated
            } finally {
                document.getElementById('save-username-btn').disabled = false;
                document.getElementById('save-username-btn').textContent = "שמור שינויים"; // Translated
            }
        }
        function openLeaderboardModal() {
            document.getElementById('leaderboard-modal-overlay').classList.add('visible');
        }

        function closeLeaderboardModal(event) {
            document.getElementById('leaderboard-modal-overlay').classList.remove('visible');
            event.stopPropagation();
        }

        window.openLeaderboardModal = openLeaderboardModal;
        window.closeLeaderboardModal = closeLeaderboardModal;

        window.openUsernameChangeModal = openUsernameChangeModal;
        window.closeUsernameChangeModal = closeUsernameChangeModal;
        window.saveNewUsername = saveNewUsername;

         window.openHeadToHeadOptions = openHeadToHeadOptions;
        window.closeHeadToHeadOptions = closeHeadToHeadOptions;
        window.startRandomMatch = startRandomMatch;
        window.openPlayWithFriendModal = openPlayWithFriendModal;
        window.closePlayWithFriendModal = closePlayWithFriendModal;
        window.joinFriendRoom = joinFriendRoom;
        window.createFriendRoom = createFriendRoom;
        window.openMultiplayerMode = openMultiplayerMode;

    </script>
