<script>
    import { affirmations } from "../stores/store.js";

    import "../app.css";
    import { onMount } from "svelte";

    let backgroundObject = {
        beach1: { theme: "dark", accent: "" },
        flowers1: { theme: "dark", accent: "" },
        flowers2: { theme: "dark", accent: "" },
        flowers3: { theme: "dark", accent: "" },
        forest1: { theme: "light", accent: "" },
        forest2: { theme: "light", accent: "" },
        forest3: { theme: "light", accent: "" },
        forest4: { theme: "light", accent: "" },
        forest5: { theme: "light", accent: "" },
        forest6: { theme: "light", accent: "" },
        forest7: { theme: "light", accent: "" },
        frozen1: { theme: "dark", accent: "" },
        frozen2: { theme: "dark", accent: "" },
        frozen3: { theme: "dark", accent: "" },
        grass1: { theme: "light", accent: "" },
        grass2: { theme: "light", accent: "" },
        space1: { theme: "light", accent: "" },
        space2: { theme: "light", accent: "" },
        space3: { theme: "light", accent: "" },
        water1: { theme: "dark", accent: "" },
        water2: { theme: "dark", accent: "" },
        water3: { theme: "light", accent: "" },
        water4: { theme: "dark", accent: "" },
        water5: { theme: "light", accent: "" },
        water6: { theme: "light", accent: "" },
        water7: { theme: "light", accent: "" },
    };

    let backgroundURLs = Object.keys(backgroundObject);

    // let defaultImg = "water7";
    let showModal = false;
    let showImageModal = false;
    let showInfo = false;
    let affirmationItems;
    let text = "";
    let author = "";
    let error = false;
    let tab = "theme";
    let isMounted = true;

    affirmations.subscribe((value) => {
        affirmationItems = value;
    });

    onMount(() => {
        isMounted = false;
        const previousDay = new Date(affirmationItems.lastDay).getDay();
        const previousMonth = new Date(affirmationItems.lastDay).getMonth();
        const now = new Date();
        const today = now.getDay();
        const month = now.getMonth();
        if (`${previousMonth}/${previousDay}` !== `${month}/${today}`) {
            console.log("Add streak day!");
            affirmations.update((curr) => {
                return {
                    ...curr,
                    streak: curr.streak + 1,
                    lastDay: now,
                };
            });
        }
    });

    function handleAddAffirmation() {
        if (!text) {
            error = true;
            return;
        }
        error = false;
        affirmations.update((curr) => {
            return {
                ...curr,
                items: [...curr.items, { name: author, description: text }],
            };
        });
        showModal = false;
    }

    function handleChangeImage(imageName) {
        affirmations.update((curr) => {
            return {
                ...curr,
                image: imageName,
            };
        });
    }

    function handleEditAffirmation(index) {
        text = affirmationItems.items[index].description;
        author = affirmationItems.items[index].name;
        showModal = true;
        showImageModal = false;
        affirmations.update((curr) => {
            return {
                ...curr,
                items: curr.items.filter((val, valIndex) => valIndex !== index),
            };
        });
    }

    function handleDeleteAffirmation(index) {
        affirmations.update((curr) => {
            return {
                ...curr,
                items: curr.items.filter((val, valIndex) => valIndex !== index),
            };
        });
    }

    function handleCloseTextModal() {
        text = "";
        author = "";
        showModal = false;
    }

    function onKeyDown(e) {
		 if (e.key === 'Escape') {
            showImageModal = false
            showInfo = false
            showModal = false
         }
	}
</script>

{#if isMounted}
    <main
        class="min-h-screen flex text-slate-700 items-center justify-center relative"
    >
        <i class="fa-solid fa-spinner text-4xl animate-spin" />
    </main>
{:else}
    <main
        class={"min-h-screen relative flex flex-col text-sm sm:text-base " +
            (backgroundObject[affirmationItems.image].theme === "dark"
                ? " text-slate-800 "
                : " text-white")}
    >
        {#if showInfo}
            <div
                class="fixed z-[100] inset-0 bg-white flex flex-col p-8 text-slate-700 items-center justify-center"
            >
                <button
                    on:click={() => {
                        showInfo = false;
                    }}
                    class="absolute top-4 right-4"
                >
                    <i class="fa-solid fa-xmark text-lg" />
                </button>
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="flex flex-col gap-2 sm:gap-4">
                        <h3 class="font-bold text-4xl sm:text-5xl">
                            <span class="">Affirmations.</span>
                        </h3>
                        <p>Your daily dose of facts and positivity.</p>
                        <p class="text-sm text-slate-400">
                            About the <a
                                href="https://smoljames.com"
                                target="_blank"
                                class="text-blue-400 hover:text-blue-600"
                                >author &rarr;</a
                            >
                        </p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div
                            class="flex flex-col md:flex-row gap-2 gap-y-0 md:items-end"
                        >
                            <h4 class="text-5xl font-bold text-slate-300">
                                01
                            </h4>
                            <p class="pb-1">
                                Squirrel away some golden comments and positive
                                affirmations.
                            </p>
                        </div>
                        <div
                            class="flex flex-col md:flex-row gap-2 gap-y-0 md:items-end"
                        >
                            <h4 class="text-5xl font-bold text-slate-300">
                                02
                            </h4>
                            <p class="pb-1">
                                Set your vista to match your vibe.
                            </p>
                        </div>
                        <div
                            class="flex flex-col md:flex-row gap-2 gap-y-0 md:items-end"
                        >
                            <h4 class="text-5xl font-bold text-slate-300">
                                03
                            </h4>
                            <p class="pb-1">
                                Soak up the goodness and positive energy every
                                minute of the day!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        {#if showImageModal}
            <div
                class="fixed bg-white text-slate-800 z-[110] top-0 left-0 h-full w-full p-6 flex flex-col gap-4 overflow-scroll"
            >
                <div
                    class="flex flex-col flex-1 gap-8 md:grid grid-cols-2 lg:grid-cols-3 md:justify-center relative max-w-[1000px] mx-auto w-full"
                >
                    <div
                        class="fixed md:relative md:ml-auto p-4 md:p-0 col-span-2 lg:col-span-3 top-0 right-0 items-center gap-4 justify-between text-xl sm:text-2xl"
                    >
                        <button
                            on:click={() => {
                                showImageModal = false;
                            }}
                            class=""
                            ><i class="fa-regular fa-floppy-disk" /></button
                        >
                    </div>
                    <!-- <div class=" hidden md:flex  text-4xl flex-col ">
                    <button  on:click={() => tab = 'theme'} class={"duration-200 font-bold rounded-md p-2 " + (tab === 'theme' ? ' bg-rose-50' : ' ')}>
                        <span class="text-rose-400">Theme</span>
                    </button >
                    <button on:click={() => tab = 'affirmations'}  class={"duration-200 font-bold rounded-md p-2 " + (tab === 'affirmations' ? ' bg-indigo-50' : ' ')}>
                        <span class="text-indigo-400">Affirmations</span>
                    </button >
                </div> -->
                    <h3 class="font-bold md:inline hidden text-5xl">
                        <span class="text-rose-400">Theme</span>
                    </h3>
                    <div class={"flex flex-col gap-4 lg:col-span-2 "}>
                        <h3 class="font-bold text-5xl md:hidden sm:text-6xl">
                            <span class="text-rose-400">Theme</span>
                        </h3>
                        <div class="flex flex-col gap-2">
                            <div class="relative flex flex-col blur-load">
                                <p
                                    class="absolute text-white top-0 left-0 p-2 z-[10]"
                                >
                                    Current
                                </p>
                                <div
                                    class="blur-load relative aspect-video"
                                    style="background-image:url(/backgrounds/{affirmationItems?.image}_sm.jpeg) "
                                >
                                    <img
                                        on:load={(self) => {
                                            self.target.style.opacity = 1;
                                        }}
                                        src={`/backgrounds/${affirmationItems.image}.png`}
                                        alt="bg"
                                        loading="lazy"
                                        class="shadow object-cover w-full h-full opacity-0 duration-200 object-center"
                                    />
                                </div>
                                <div
                                    class="flex items-center py-4 w-full h-full overflow-x-scroll gap-2"
                                >
                                    {#each backgroundURLs as bg}
                                        <button
                                            on:click={() =>
                                                handleChangeImage(bg)}
                                            class={"border cursor-pointer duration-200 border-solid shrink-0 w-[100px] aspect-video blur-load " +
                                                (bg == affirmationItems.image
                                                    ? " border-rose-300"
                                                    : " border-white hover:border-rose-300")}
                                            style="background-image:url(/backgrounds/{bg}_sm.jpeg)"
                                        >
                                            <img
                                                src={`/backgrounds/${bg}.png`}
                                                alt="bg"
                                                loading="lazy"
                                                class={" object-cover hidden w-full object-cover opacity-0 duration-200 relative object-center"}
                                                on:load={(self) => {
                                                    self.target.style.opacity = 1;
                                                }}
                                            />
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="font-bold md:inline hidden text-5xl">
                        <span class="text-indigo-400">Affirmations</span>
                    </h3>
                    <div class={"flex flex-col gap-4 lg:col-span-2 "}>
                        <h3 class="font-bold text-5xl md:hidden sm:text-6xl">
                            <span class="text-indigo-400">Affirmations</span>
                        </h3>
                        <div class="flex flex-col gap-1">
                            {#if affirmationItems.items.length === 0}
                                <p class="p-2 text-slate-400 text-sm">none.</p>
                            {:else}
                                {#each affirmationItems.items as aff, index}
                                    <div
                                        class="flex flex-col p-2 group rounded hover:bg-indigo-50 overflow-hidden relative"
                                    >
                                        <p class="whitespace-none truncate">
                                            {aff.description}
                                        </p>
                                        <p
                                            class="text-xs text-slate-400 italic sm:text-sm"
                                        >
                                            - {aff.name}
                                        </p>
                                        <div
                                            class="absolute right-0 top-1/2 bg-indigo-50 text-slate-600 p-2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 sm:gap-3"
                                        >
                                            <button
                                                on:click={() =>
                                                    handleEditAffirmation(
                                                        index
                                                    )}
                                                class="hover:opacity-60 duration-200"
                                            >
                                                <i
                                                    class="fa-solid fa-pen-to-square"
                                                />
                                            </button>
                                            <button
                                                on:click={() =>
                                                    handleDeleteAffirmation(
                                                        index
                                                    )}
                                                class="hover:opacity-60 duration-200"
                                            >
                                                <i
                                                    class="fa-solid fa-trash-can"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        {#if showModal}
            <div
                class="fixed z-[100] inset-0 text-slate-800 flex flex-col p-4 items-center justify-center"
            >
                <button
                    on:click={handleCloseTextModal}
                    class="absolute inset-0 bg-slate-950 opacity-50 z-[-1]"
                />

                <div
                    class="bg-white rounded-md min-h-[200px] sm:min-h-[300px] shadow p-4 w-full max-w-prose sm:p-6 flex flex-col gap-4"
                >
                    <div
                        class={"flex relative border border-solid duration-200 rounded-md flex-col flex-1 p-2 max-h-[400px] h-72 overflow-scroll z-[100] " +
                            (error && !text
                                ? " border-rose-200"
                                : " border-transparent")}
                    >
                        {#each text.split("\n") as sentence}
                            <p>{sentence}</p>
                        {/each}
                        <!-- <p>{text}</p> -->
                        <textarea
                            bind:value={text}
                            class="absolute inset-0 p-2 bg-white outline-none w-full focus:outline-hone resize-none"
                            placeholder="Words of kindness"
                        />
                    </div>
                    <div class="flex relative flex-col p-2 z-[100]">
                        <!-- <p>{author}</p> -->
                        <!-- <p>{text}</p> -->
                        <input
                            bind:value={author}
                            class="absolute inset-0 p-2 outline-none w-full focus:outline-hone"
                            placeholder="- by who"
                        />
                    </div>

                    <button
                        on:click={handleAddAffirmation}
                        class="ml-auto font-medium"
                    >
                        <p
                            class="relative z-[1] text-rose-300 hover:text-rose-400 duration-200"
                        >
                            Add Affirmation
                        </p>
                    </button>
                </div>
            </div>
        {/if}
        <div
            class={"fixed top-0 left-0 z-[99] w-full p-4 text-lg sm:text-xl md:text-2xl p-6 flex items-center justify-between gap-4 "}
        >
            <div
                class={"absolute inset-0 opacity-40 z-0  " +
                    (backgroundObject[affirmationItems.image].theme === "dark"
                        ? " bg-gradient-to-b from-slate-200 to-transparent"
                        : " bg-gradient-to-b from-slate-950 to-transparent")}
            />
            <div class="flex items-center gap-4 relative z-[1]">
                <button
                    on:click={() => (showInfo = true)}
                    class="grid place-items-center duration-200"
                >
                    <i class={"fa-solid fa-circle-info duration-200 "} />
                </button>
            </div>

            <div
                class="flex items-center gap-4 sm:gap-5 md:gap-6 relative z-[1]"
            >
                <button
                    on:click={() => (showImageModal = true)}
                    class="grid place-items-center relative group"
                >
                    <i
                        class={"fa-solid fa-image duration-200 " +
                            (backgroundObject[affirmationItems.image].theme ===
                            "dark"
                                ? " hover:text-slate-600 "
                                : " hover:text-slate-200")}
                    />
                    <div
                        class={"top-full absolute font-medium right-0  mt-1.5 text-xs px-1.5 py-1 rounded-lg group-hover:flex hidden duration-200 " +
                            (backgroundObject[affirmationItems.image].theme ===
                            "dark"
                                ? " bg-slate-600 text-white "
                                : " bg-white text-slate-700")}
                    >
                        <p>Config</p>
                    </div>
                </button>

                <div class="grid place-items-center relative group">
                    <i class={"fa-solid fa-fire duration-200 "} />
                    <div
                        class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 grid place-items-center bg-rose-400 h-[14px] sm:h-4 aspect-square overflow-hidden rounded-full"
                    >
                        <p
                            class="text-xs text-white absolute top-1/2 left-1/2 scale-75 sm:scale-90 -translate-x-1/2 -translate-y-1/2 z-10"
                        >
                            {affirmationItems.streak}
                        </p>
                    </div>
                    <div
                        class={"top-full absolute font-medium right-0  mt-1.5 text-xs px-1.5 py-1 rounded-lg group-hover:flex hidden duration-200 " +
                            (backgroundObject[affirmationItems.image].theme ===
                            "dark"
                                ? " bg-slate-600 text-white "
                                : " bg-white text-slate-700")}
                    >
                        <p class="">Days</p>
                    </div>
                </div>
                <button
                    on:click={() => (showModal = true)}
                    class="grid place-items-center relative group"
                >
                    <i
                        class={"fa-solid fa-plus duration-200 " +
                            (backgroundObject[affirmationItems.image].theme ===
                            "dark"
                                ? " hover:text-slate-600 "
                                : " hover:text-slate-200")}
                    />
                    <div
                        class={"top-full absolute font-medium right-0  mt-1.5 text-xs px-1.5 py-1 rounded-lg group-hover:flex hidden duration-200 " +
                            (backgroundObject[affirmationItems.image].theme ===
                            "dark"
                                ? " bg-slate-600 text-white "
                                : " bg-white text-slate-700")}
                    >
                        <p>Add</p>
                    </div>
                </button>
            </div>
        </div>
        <div
            class="fixed top-0 left-0 w-full h-full z-0 blur-load"
            style="background-image:url(/backgrounds/{affirmationItems?.image}_sm.jpeg)"
        >
            <img
                src={`/backgrounds/${affirmationItems?.image}.png`}
                class="w-full h-full object-cover relative object-center opacity-0 duration-200"
                loading="lazy"
                alt="default-bg"
                on:load={(self) => {
                    self.target.style.opacity = 1;
                }}
            />
        </div>
        {#if affirmationItems.items.length === 0}
            <div
                class="flex flex-col flex-1 items-center justify-center p-4 gap-6 sm:gap-10 relative z-10"
            >
                <div class="flex flex-col text-center">
                    <h4
                        class="font-medium text-lg sm:text-xl md:text-2xl textShadow"
                    >
                        Welcome To
                    </h4>
                    <h1
                        class="font-semibold text-4xl sm:text-5xl md:text-6xl textShadowLg"
                    >
                        Affirmations
                    </h1>
                </div>
                <button
                    on:click={() => (showModal = true)}
                    class="bg-white text-rose-300 font-medium px-6 py-3 text-base sm:px-8 sm:py-4 relative rounded-full overflow-hidden after:absolute after:bg-slate-50 after:top-0 after:right-full after:h-full after:w-full hover:after:translate-x-full after:duration-200"
                >
                    <p class="relative z-[1]">Add Affirmation</p>
                </button>
            </div>
        {:else}
            <slot />
        {/if}
    </main>
{/if}


<svelte:window on:keydown={onKeyDown} />