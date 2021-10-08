<template>
    <div :id="`${visitorInfo.id}_modal`" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-xl border-0">
            <div class="modal-content">
                <div class="modal-header bg-dark shadow-sm">
                    <h5 class="modal-title text-white h3">{{ visitorInfo?.days?.split("||")[0] || "Not Specified" }}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="container mt-3 mb-3 mx-auto">
                    <li
                        class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow"
                    >Period 1 Day 1: {{ visitorInfo["p1D1"]?.split('||')[0] || "Didnt register For a Workshop" }}</li>
                    <li
                        class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow"
                    >Period 2 Day 1: {{ visitorInfo["p2D1"]?.split('||')[0] || "Didnt register For a Workshop" }}</li>
                    <li
                        class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow"
                    >Period 1 Day 2: {{ visitorInfo["p1D2"]?.split('||')[0] || "Didnt register For a Workshop" }}</li>
                    <li
                        class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow"
                    >Period 2 Day 2: {{ visitorInfo["p2D2"]?.split('||')[0] || "Didnt register For a Workshop" }}</li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex"
export default {
    name: "VisitorWorkshops",
    props: {
        visitorInfo: Object,
    },
    setup(props) {
        const store = useStore()
    },
}
</script>
