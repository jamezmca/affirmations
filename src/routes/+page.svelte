<script>
    import { affirmations } from "../stores/store.js";

    let affirmationItems;
    let div;

    affirmations.subscribe((value) => {
        affirmationItems = value;
    });

    let index = 0;

    setInterval(async () => {
        div.style.opacity = 0;
        await new Promise((r) => setTimeout(r, 500));
        index = (index + 1) % affirmationItems.items.length;
        div.style.opacity = 1;
    }, 30000);

    //   $: console.log(tick)
</script>

<section class="flex flex-col flex-1 items-center justify-center z-20 py-20 px-8">
    <div
        bind:this={div}
        class="flex flex-col duration-[500ms] text-center gap-4 sm:gap-10"
    >
        <h1 class="font-semibold text-3xl sm:text-4xl md:text-5xl ">
            {affirmationItems.items[index].description}
        </h1>
        <h4 class=" text-lg opacity-70 sm:text-xl md:text-2xl italic ">
            - {affirmationItems.items[index].name}
        </h4>
    </div>
</section>
