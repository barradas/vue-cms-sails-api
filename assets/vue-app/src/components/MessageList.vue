<template>
    <v-container class="">
            <h1>My messages</h1>
            <div class="field">
                <div class="control">
                    <input class="input" type="text" v-model="newMessage" placeholder="your next message">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input class="input" type="text" v-model="author" placeholder="author">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <a class="button is-primary" @click="addMessage({author: author, body: newMessage, replied: false})">Add Message</a>&nbsp;
                    <a class="button is-primary" @click="messagesShowConfig = 2">show all</a>&nbsp;
                    <a class="button is-primary" @click="messagesShowConfig = 1">show replied</a>&nbsp;
                    <a class="button is-primary" @click="messagesShowConfig = 0">show not replied</a>&nbsp;
                </div>
            </div>
            <ul>
                {{messages}}
                <message v-if="messagesShowConfig === 2" v-for="message in messages" :key="message.id">{{message.id}} - {{message.body}} - {{message.author}}<span> status:<input type="checkbox" :checked="message.replied" @click="message.replied ? message.replied = false : message.replied = true"></span><button class="button is-danger" @click="deleteMessage(message.id)">X</button>
                </message>
                <message v-if="messagesShowConfig === 1" v-for="message in replied" :key="message.id">{{message.id}} - {{message.body}} - {{message.author}} <span> status:<input type="checkbox" :checked="message.replied" @click="message.replied ? message.replied = false : message.replied = true"></span><button class="button is-danger" @click="deleteMessage(message.id)">X</button>
                </message>
                <message v-if="messagesShowConfig === 0" v-for="message in notReplied" :key="message.id">{{message.id}} - {{message.body}} - {{message.author}} <span> status:<input type="checkbox" :checked="message.replied" @click="message.replied ? message.replied = false : message.replied = true"></span><button class="button is-danger" @click="deleteMessage(message.id)">X</button>
                </message>
           </ul>
    </v-container>
</template>

<script>
    import store from '../store/store'
    import Message from './Message.vue';
    export default {
        data: function() {
            return {
                messagesShowConfig: 2,
                newMessage: '',
                author:''
            }
        },
        mounted: function() {
            this.getMessages();
        },
        methods: {
            getMessages() {
                store.dispatch('getMessages');
            },
            addMessage (message) {
                store.dispatch('addMessage', message);
            },
            deleteMessage (id) {
                store.dispatch('deleteMessage', id);
            }

        },
        computed: {
            //...mapGetters({
            //    message: 'messages',
            //    notReplied: 'notReplied',
            //    replied: 'replied'
            //}),
            messages(){
                return this.$store.getters.messages;
            },
            notReplied(){
                return this.$store.getters.notReplied
            },
            replied(){
                return this.$store.getters.replied
            }
        },
        components:{
            Message: Message

        }
    }
</script>
