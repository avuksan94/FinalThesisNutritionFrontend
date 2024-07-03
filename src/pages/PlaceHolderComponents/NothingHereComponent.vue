<template>
    <card>
        <div>
            <div>
                <img src="@/assets/img/foodPics/WheresThaData.webp" alt="..." />
                <h4>
                    {{ $t('empty_here.message_one') }}
                </h4>
                <h4>
                    {{ $t('empty_here.message_two') }}
                </h4>
            </div>
        </div>
    </card>
</template>

<script>
</script>

<style scoped>
.card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    width: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin-bottom: 10px;
}

h4 {
    text-align: center;
    margin: 0;
}

a {
    text-decoration: none;
    color: #000;
}

a small {
    display: block;
}
</style>