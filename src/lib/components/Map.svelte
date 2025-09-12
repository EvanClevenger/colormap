<script lang="ts">
	/** src/lib/components/Map.svelte
	 * Map Component
	 * @description Renders the leaflet map, base layer and features geojson on the client side (onMount)
	 * @todo dynamically set base layer
	 */
	import { onMount } from 'svelte';
	import { cleanupMap, initMapAndLayers } from '$lib/services';
	import { ControlPanel } from '$lib/components';
	import {tick} from 'svelte'

	let mapContainer: HTMLDivElement;
	let loading = true

	// onMount so this doesnt get SSR'd, only happens on the client side
	onMount(async () => {
		// initialize map and layers
		try {
			initMapAndLayers(mapContainer); // this await is crashing the app
			await tick()
		} catch (error) {
			console.log(`map failed to load : ${error}`);
		}
		loading = false
		// cleanup on unmount
		return cleanupMap();
	});
</script>

<ControlPanel />

{#if loading}
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
{/if}

<div bind:this={mapContainer} class="h-screen w-full" id="map-container"></div>

<style>
	.spinner-container{
		position: fixed;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner{
		width: 60px;
		height: 60px;
		border: 4px solid #ccc;
		border-top: 4px solid #007bff;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to{
			transform: rotate(360deg);
		}
	}
</style>