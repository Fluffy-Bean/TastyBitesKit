<script lang="ts">
    import type { PageServerData } from "./$types";
    import type { Map } from "leaflet";
    import { onMount, onDestroy } from "svelte";
    import { ArrowUpRight } from "phosphor-svelte";

    import MenuItemGrid from "$lib/components/MenuItemGrid.svelte";

    interface Props {
        data: PageServerData;
    }

    let { data }: Props = $props();

    let leafletMap: Map;

    onMount(async () => {
        const L = await import("leaflet");

        leafletMap = L.map("map").setView([50.82304922105467, -0.432780150496344], 13);
        L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 20,
                attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
            },
        ).addTo(leafletMap);
        L.marker([50.82304922105467, -0.432780150496344]).addTo(leafletMap);

        console.log("Loaded Leaflet map.");
    });
    onDestroy(async () => {
        if(leafletMap) {
            leafletMap.remove();
            console.log("Unloaded Leaflet map.");
        }
    });
</script>

<div class="announcement-banner">
    <img src="/banner_images/BannerExampleImage.jpg" alt="">
</div>

<div class="spacer"></div>

<h2>Where to find us</h2>
<div id="contact">
    <div id="map"></div>
    <div class="container">
        <h2>Opening Times</h2>
        <p>Please make sure to checkout our full calendar, as we have different times during public holiday</p>
        <div id="timetable">
            <table>
                <thead>
                    <tr><th>Day</th><th>Opening</th><th>Closing</th></tr>
                </thead>
                <tbody>
                    <tr><td>Monday</td><td>9am</td><td>12pm</td></tr>
                    <tr><td>Tuesday</td><td>9am</td><td>12pm</td></tr>
                    <tr><td>Wednesday</td><td>9am</td><td>12pm</td></tr>
                    <tr><td>Thursday</td><td>9am</td><td>12pm</td></tr>
                    <tr><td>Friday</td><td>9am</td><td>12pm</td></tr>
                    <tr><td>Saturday</td><td>11am</td><td>2am</td></tr>
                    <tr><td>Sunday</td><td>11am</td><td>2am</td></tr>
                </tbody>
            </table>
        </div>
        <a href="/booking">Ready to book a table?</a>
    </div>
</div>

<div class="spacer"></div>

<h2>About Us</h2>
<div class="container padding">
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
</div>
<a href="/about">Continue reading <ArrowUpRight /></a>

<div class="spacer"></div>

<h2>Popular Today</h2>
<div id="popular">
    <MenuItemGrid items={data.popularToday} />
</div>
<a href="/menu">See All <ArrowUpRight /></a>


<style lang="scss">
    @use "$lib/styles/vars";

    a {
        margin-top: 8px;
        padding: 0 vars.$spacing-small;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        float: right;

        text-decoration: none;

        border-radius: 9999px;
        background-color: transparent;
        color: vars.$color-on-background;

        &:hover {
            background-color: vars.$color-light;
            color: vars.$color-on-light;
        }
    }

    #map {
        min-width: 550px;
        border-radius: vars.$border-radius-normal;
        box-shadow: 0 1px 0.5px rgba(#000, 0.3);
    }

    #contact {
        display: flex;
        flex-direction: row;

        .container {
            margin-left: vars.$spacing-small;
            padding: vars.$spacing-normal;

            width: 100%;

            h2, p {
                padding-bottom: vars.$spacing-xsmall;
            }

            a {
                margin-top: 8px;
                padding: 0 vars.$spacing-small;

                width: 100%;
                height: 30px;

                display: flex;
                justify-content: center;
                align-items: center;

                font-size: vars.$font-size-p;
                text-decoration: none;

                border-radius: 9999px;
                background-color: vars.$color-primary;
                color: vars.$color-on-primary;

                &:hover {
                    background-color: vars.$color-dark;
                    color: vars.$color-on-dark;
                }
            }
        }
    }

    #timetable {
        border-radius: vars.$border-radius-normal;
        border: 1px solid rgba(#000, 0.1);
        background-color: vars.$color-light;

        overflow: hidden;

        table {
            width: 100%;
            border-collapse: collapse;

            tr {
                border-bottom: 1px solid rgba(#000, 0.1);

                &:last-of-type {
                    border: 0 solid transparent;
                }

                th, td {
                    padding: vars.$spacing-xsmall vars.$spacing-small;
                    border-right: 1px solid rgba(#000, 0.1);

                    &:last-of-type {
                        border: 0 solid transparent;
                    }
                }

                th {
                    font-weight: vars.$font-weight-bolder;
                }
                td {
                    font-weight: vars.$font-weight-normal;
                }
            }
        }
    }

    #popular {
        position: relative;
    }

    .padding {
        padding: vars.$spacing-normal;
    }

    @media only screen and (max-width: 900px) {
        #map {
            min-width: 400px;
            border-radius: vars.$border-radius-normal 0 0 vars.$border-radius-normal;
        }
        #contact {
            .container {
                margin-left: 0;
                border-radius: 0 vars.$border-radius-normal vars.$border-radius-normal 0;
            }
        }
    }
    @media only screen and (max-width: 750px) {
        #map {
            min-width: unset;
            height: 350px;
            border-radius: vars.$border-radius-normal vars.$border-radius-normal 0 0;
        }
        #contact {
            display: flex;
            flex-direction: column;

            .container {
                border-radius: 0 0 vars.$border-radius-normal vars.$border-radius-normal;
            }
        }
    }
</style>
