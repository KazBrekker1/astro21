<template>
    <div :id="`ArAS${visitorInfo.id}_modal`" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-xl border-0">
            <div class="modal-content bg-dark">
                <div class="modal-header bg-dark shadow-sm">
                    <h5 class="modal-title text-white h3">Workshops Attended</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="container mt-3 mb-3 mx-auto">
                    <li class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow">
                        Workshop 1:
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            :checked="visitorInfo.w1"
                            :disabled="visitorInfo.w1"
                            @click="toggleWorkshopAttending(visitorInfo.id, 'w1')"
                        />
                    </li>
                    <li class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow">
                        Workshop 2:
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            :checked="visitorInfo.w2"
                            :disabled="visitorInfo.w2"
                            @click="toggleWorkshopAttending(visitorInfo.id, 'w2')"
                        />
                    </li>
                    <li class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow">
                        Workshop 3:
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            :checked="visitorInfo.w3"
                            :disabled="visitorInfo.w3"
                            @click="toggleWorkshopAttending(visitorInfo.id, 'w3')"
                        />
                    </li>
                    <li class="list-group-item list-group-item-info fs-5 p-3 mb-2 rounded shadow">
                        Workshop 4:
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            :checked="visitorInfo.w4"
                            :disabled="visitorInfo.w4"
                            @click="toggleWorkshopAttending(visitorInfo.id, 'w4')"
                        />
                    </li>
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
        const toggleWorkshopAttending = (visitorId, workshop) => {
            store.dispatch("visitorAttendedWorkshop", { visitorId, workshop })
        }
        return {
            toggleWorkshopAttending
        }
    },
}
</script>
