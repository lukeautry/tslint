/*
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {IConfigurationFile, extendConfigurationFile} from "../src/configuration";

describe("Configuration", () => {
    it("extendConfigurationFile", () => {
        const EMPTY_CONFIG: IConfigurationFile = {
            rules: {},
            rulesDirectory: [],
        };

        assert.deepEqual(extendConfigurationFile({}, {}), EMPTY_CONFIG);
        assert.deepEqual(extendConfigurationFile({}, EMPTY_CONFIG), EMPTY_CONFIG);
        assert.deepEqual(extendConfigurationFile(EMPTY_CONFIG, {}), EMPTY_CONFIG);
        assert.deepEqual(extendConfigurationFile({}, {rules: {foo: "bar"}, rulesDirectory: "foo"}), {
            rules: {foo: "bar"},
            rulesDirectory: ["foo"],
        });
        assert.deepEqual(extendConfigurationFile({
            rules: {
                "a": 1,
                "b": 2,
            },
            rulesDirectory: ["foo", "bar"],
        }, {
            rules: {
                "b": 1,
                "c": 3,
            },
            rulesDirectory: "baz",
        }), {
            rules: {
                "a": 1,
                "b": 2,
                "c": 3,
            },
            rulesDirectory: ["foo", "bar", "baz"],
        });
    });
});
