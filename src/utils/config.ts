import convict from 'convict';

let config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    port: {
        default: 3000
    },
    database: {
        host: {
            default: 'loalhost'
        },
        port: {
            default: 27017
        },
        name: {
            default: 'eStore'
        }
    }
});

let env = config.get('env');
config.loadFile(`./${env}.json`);
config.validate({ allowed: 'strict' });

export default config;
