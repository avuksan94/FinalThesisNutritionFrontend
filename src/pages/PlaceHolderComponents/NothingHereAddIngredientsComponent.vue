<template>
    <card class="container-fluid">
        <div class="container-fluid">
            <div>
                <div class="row justify-content-center">
                    <img src="@/assets/img/foodPics/WheresThaData3.webp" alt="..." />
                </div>
                <h4>
                    {{ $t('empty_here_ingredients_add.message_one') }}
                </h4>
                <h4>
                    {{ $t('empty_here_ingredients_add.message_two') }}
                </h4>
            </div>
        </div>
    </card>
</template>

<script>
</script>

<style scoped>
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