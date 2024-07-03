<template>
    <button @click.stop="confirmDeletion" class="delete-user-btn">
        {{ $t("forget_me.delete_account") }}
    </button>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        confirmDeletion() {
            const confirmation = confirm(this.$t("forget_me.are_you_sure"));
            if (confirmation) {
                this.forgetUser();
            }
        },
        async forgetUser() {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");

            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }
            const userUrl = `/users/${username}`;
            try {
                await axios.delete(userUrl);
                this.logout();
            } catch (error) {
                console.error("Error deleting the user account:", error);
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('nutrioUser');
            this.$store.commit('resetState');
            this.$router.push('/login');
        },
    }
};
</script>

<style scoped>
.delete-user-btn {
    background-color: #d9534f;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}
</style>
