<template>
  <div class="d-flex flex-column h-100">
		<Navbar/>

  <div class="container">
    <b-form>

      <!-- Wrapperd -->
      <b-form-group
        id="input-group-1"
        label="Create FHIR HLv7 Resource:"
        label-for="input-1"
        description="The URI used to retrieve this record."
      >

      <b-form-group id="input-group-type" label="ResourceType:" label-for="input-3">

        <b-form-select
          id="input-1"
          v-model="form.resourceType"
          :options="resourceTypeEnum"
          
        ></b-form-select>
      </b-form-group>


      <b-form-group id="input-group-identifier" label="FHIR Identifier:">
      <b-input-group>
      <b-input-group-text slot="prepend"> https://{{form.identifier.system}}{{form.resourceType}}/</b-input-group-text>
        <b-form-input
          id="input-2"
          v-model="form.identifier.value"
          type="string"
          
          placeholder="Identifier">
        </b-form-input>

        <b-dropdown :text="form.identifier.use"
        variant="success" slot="append">
			<b-dropdown-item v-for="(option, index) in identifierUseEnum" :key="index"
			@click="form.identifier.use = option">{{option}}
            </b-dropdown-item>
        </b-dropdown>
      </b-input-group>
      </b-form-group>

	  <b-form-group id="input-group-name" label="Patient Name" v-for="(name, index) in form.name">
		  <b-form inline>
		        <b-dropdown :text="name.prefix"
		        variant="info" slot="prepend">
					<b-dropdown-item v-for="(prefix, pindex) in namePrefixEnum" :key="pindex"
					@click="name.prefix = prefix">{{prefix}}
		            </b-dropdown-item>
		        </b-dropdown>

		        <b-form-input
		          id="'input-given-'+index"
		          v-model="name.given"
		          type="string"
		          
		          placeholder="Given">
		        </b-form-input>

		        <b-form-input
		          id="'input-family'+index"
		          v-model="name.family"
		          type="string"
		          
		          placeholder="Family">
		        </b-form-input>

		        <b-dropdown :text="name.suffix"
		        variant="info" slot="append">
					<b-dropdown-item v-for="(suffix, sindex) in nameSuffixEnum" :key="sindex"
					@click="name.suffix = suffix">{{suffix}}
		            </b-dropdown-item>
		        </b-dropdown>
		    	<b-dropdown :text="name.use"
		        variant="info" slot="append">
					<b-dropdown-item v-for="(use, uindex) in identifierUseEnum" :key="uindex"
					@click="name.use = use">{{use}}
		            </b-dropdown-item>
		        </b-dropdown>
		      </b-input-group>
		  </b-form>
      </b-form-group>
      <button @click="addName">
	    +
	  </button>
	  <span>
	  <button @click="rmName">
	    -
	  </button>
	  </span>



	<b-form-group label="Gender" class="mt-3">
	  <b-form-radio-group
	    v-model="form.gender"
	    :options="administrativeGenderEnum"
	    name="gender-inline"
	  ></b-form-radio-group>
	</b-form-group>



	  <b-form-group id="input-group-telecom" label="Contact Points" v-for="(telecom, index) in form.telecom">
		  <b-form inline>
		        <b-dropdown :text="telecom.system"
		        variant="info" slot="prepend">
					<b-dropdown-item v-for="(system, sindex) in telecomSystemEnum" :key="sindex"
					@click="telecom.system = system">{{system}}
		            </b-dropdown-item>
		        </b-dropdown>

		        <b-form-input
		          id="'input-value-'+index"
		          v-model="telecom.value"
		          type="string"
		          
		          placeholder="Phone/Email/Etc.">
		        </b-form-input>

		        <b-dropdown :text="telecom.use"
		        variant="info" slot="append">
					<b-dropdown-item v-for="(use, uindex) in telecomUseEnum" :key="uindex"
					@click="telecom.use = use">{{use}}
		            </b-dropdown-item>
		        </b-dropdown>
		      </b-input-group>
		  </b-form>
      </b-form-group>
      <button @click="addTelecom">
	    +
	  </button>
	  <span>
	  <button @click="rmTelecom">
	    -
	  </button>
	  </span>



	  <b-form-group class="mt-3" id="input-group-address" label="Addresses" v-for="(addr, index) in form.address">

			  <b-form-radio-group
			    v-model="addr.use"
			    :options="addressUseEnum"
			    name="address-use-inline"
			  ></b-form-radio-group>

			  <b-form-radio-group
			    v-model="addr.type"
			    :options="addressTypeEnum"
			    name="address-type-inline"
			  ></b-form-radio-group>

		        <b-form-input
		          id="'input-addr-line'+index"
		          v-model="addr.value"
		          type="string"
		          
		          placeholder="Street name, number, direction & P.O. Box etc.">
		        </b-form-input>

		        <b-form-input
		          id="'input-addr-city'+index"
		          v-model="addr.city"
		          type="string"
		          
		          placeholder="City/Town">
		        </b-form-input>


		        <b-form-input
		          id="'input-addr-district'+index"
		          v-model="addr.district"
		          type="string"	          
		          placeholder="District/County Name">
		        </b-form-input>		   
		   
		   		<b-form-input
		          id="'input-addr-state'+index"
		          v-model="addr.state"
		          type="string"
		          
		          placeholder="State">
		        </b-form-input>	

		        <b-form-input
		          id="'input-addr-postal'+index"
		          v-model="addr.postalCode"
		          type="string"
		          
		          placeholder="Postal Code">
		        </b-form-input>	


		        <b-form-input
		          id="'input-addr-country'+index"
		          v-model="addr.country"
		          type="string"
		          
		          placeholder="Country">
		        </b-form-input>	

		      </b-input-group>
      </b-form-group>
      <button @click="addAddress">
	    +
	  </button>
	  <span>
	  <button @click="rmAddress">
	    -
	  </button>
	  </span>


	  <b-form-group class="mt-3" id="input-group-general" label="General Practitioners" v-for="(gen, index) in form.generalPractitioner">

		        <b-form-input
		          id="'input-gen-ref'+index"
		          v-model="gen.reference"
		          type="string"
		          
		          placeholder="URI/Link to practitioner">
		        </b-form-input>

		       	<b-form-input
		          id="'input-gen-id'+index"
		          v-model="gen.identifier"
		          type="string"
		          
		          placeholder="Identifier of Practioner (i.e. Healthlink ID)">
		        </b-form-input>


		        <b-form-input
		          id="'input-gen-display'+index"
		          v-model="gen.display"
		          type="string"
		          
		          placeholder="Display Name">
		        </b-form-input>
		      </b-input-group>
      </b-form-group>
      <button @click="addGeneralPractitioner">
	    +
	  </button>
	  <span>
	  <button @click="rmGeneralPractitioner">
	    -
	  </button>
	  </span>



	  <b-form-group id="input-group-birthday" label="Birth Date" class="mt-3">
	  <b-form-input v-model="form.birthDate" type="date">
		   <b>({{ form.active }})</b>
	  </b-form-input>
      </b-form-group>


	  <b-form-group id="input-group-active" label="Is this an active record?" class="mt-3">
	  <b-form-checkbox v-model="form.active" name="check-button" button>
		   <b>({{ form.active }})</b>
	  </b-form-checkbox>
      </b-form-group>

	  <b-form-group id="input-group-deceased" label="Is this patient deceased?">
	  <b-form inline>
	  <b-form-checkbox v-model="form.deceasedBoolean" name="check-button" button>
		<b>({{ form.deceasedBoolean }})</b>
	  </b-form-checkbox>
	  <b-form-input id="input-deceased" v-model="form.deceasedDateTime" v-if="true===form.deceasedBoolean" type="date"></b-form-input>
	  </b-form>
      </b-form-group>


      <!-- Form Wrapper Group End -->
      </b-form-group>

      <b-button @click="create" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
  </div>
</template>

<script>
  import Navbar from "../shared/Navbar.vue";

  export default {
  	components: {
  		Navbar,
  	},
    data() {
      return {
        form: {
          resourceType: null,
          identifier: {'use': 'Use', value:'', system:'mpi.healthlink.network/'},
          active: false,
          name: [{'use': '', 'text': '', 'family': '', 'given': '', 'prefix': '', 'suffix': '', period: ''}],
          telecom: [{'system': '', 'value': '', 'use': '', 'rank': '', 'period': ''}],
          gender: null,
          birthDate: null,
          deceasedBoolean: false,
          deceasedDateTime: '',
          address: [{'use': '', 'type': '', 'text': '', 'line': '', 'city': '', 'district': '', 'state': '', 'postalCode': '', 'country': '', 'period': ''}],
          martialStatus: null,
          multipleBirthBoolean: false,
          multipleBirthInteger: 0,
          photo: null,
          contact: [],
          communication: [],
          generalPractitioner: [{'reference': '', 'identifier': '', 'display': ''}],
          managingOrganization: null,
          link: [],
        },
        identifierUseEnum: ['Official', 'Usual', 'Example'],
       	namePrefixEnum: ['Dr', 'Sir', 'Mr', 'Mrs', 'Ms'],
       	nameSuffixEnum: ['PhD', 'Esq.', 'M.D.', 'I', 'II', 'III', 'IV', 'V'],
       	telecomSystemEnum: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'],
       	telecomUseEnum: ['home', 'work', 'temp', 'old', 'mobile'],
       	administrativeGenderEnum: ['male', 'female', 'other', 'unknown'],
       	addressUseEnum: ['home', 'work', 'temp', 'old'],
       	'addressTypeEnum': ['postal', 'physical', 'both'],
        resourceTypeEnum: ['Patient', 'Condition','CapabilityStatement','StructureDefinition','OperationDefinition','CodeSystem','ValueSet','Consent','Practitioner','Person','Group','PractitionerRole','Substance','Device','DeviceMetric','Observation','Procedure','Bundle','DiagonsticReport','AllergyIntolerance','FamilyMemberHistory','OperationOutcome','Encounter','Location','GeneralError'],
      }
    },
    methods: {
      create: function() {
        //const form = JSON.stringify(this.form)

        const options = {
		    headers: { Authorization: `Bearer ${this.$store.state.token}`,
		    		   'Content-Type': 'Application/json',
		    		   'Access-Control-Allow-Origin': '*' }
		};
        this.$http.post('https://mpi.healthlink.network/api/fhir', this.form, options)
   		.then(() => this.$router.push('/dashboard'))
   		.catch(err => console.log(err))
        //console.log('payload type: ' + typeof(form) + ' \n' + form)
   		//this.$store.dispatch('create', this.$store.state.token, form)

   	  },

      addName: function () {
        this.form.name.push({'use': '', 'text': '', 'family': '', 'given': '', 'prefix': '', 'suffix': '', period: ''})
      },
      rmName: function () {
        this.form.name.pop()
      },
      addTelecom: function () {
        this.form.telecom.push({'system': '', 'value': '', 'use': '', 'rank': '', 'period': {}})
      },
      rmTelecom: function () {
        this.form.telecom.pop()
      },
      addAddress: function () {
      	this.form.address.push({'use': '', 'usetype': '', 'text': '', 'line': '', 'city': '', 'district': '', 'state': '', 'postalCode': '', 'country': '', 'period': ''})
      },
      rmAddress: function () {
      	this.form.address.pop()
      },
      addGeneralPractitioner: function () {
      	this.form.generalPractitioner.push({'reference': '', 'identifier': {}, 'display': ''})
      },
      rmGeneralPractitioner: function() {
      	this.form.generalPractitioner.pop()
      }
    }
  }
</script>
<style scoped>
	.container { 
		padding-top: 20vh;
	}
</style>
