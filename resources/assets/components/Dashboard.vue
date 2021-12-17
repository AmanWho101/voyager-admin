<template>
    <div class="flex">
        <Card
            v-for="(widget, i) in widgets"
            :key="'widget-'+i"
            :no-header="((widget.title || widget.icon) ? false : true)"
            :title="widget.title"
            :icon="widget.icon"
            :class="widget.width"
        >
            <component :is="widget.component" v-bind="widget.parameters"></component>
        </Card>
        <Card :title="__('voyager::generic.welcome_to_voyager')" icon="helm" :icon-size="8" class="w-full" v-if="widgets.length == 0">
            <div>{{ __('voyager::generic.welcome_text') }}</div>
        </Card>
    </div>
</template>

<script lang="ts">
import Card from '@components/UI/Card.vue';

export default {
    components: {
        Card,
    },
    props: {
        widgets: {
            type: Array,
            default: () => [],
        }
    }
}
</script>