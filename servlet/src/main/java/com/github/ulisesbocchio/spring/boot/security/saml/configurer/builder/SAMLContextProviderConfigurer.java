package com.github.ulisesbocchio.spring.boot.security.saml.configurer.builder;

import com.github.ulisesbocchio.spring.boot.security.saml.configurer.ServiceProviderBuilder;
import com.github.ulisesbocchio.spring.boot.security.saml.properties.SAMLContextProviderProperties;
import com.github.ulisesbocchio.spring.boot.security.saml.properties.SAMLSSOProperties;
import org.assertj.core.util.VisibleForTesting;
import org.springframework.security.saml.storage.SAMLMessageStorageFactory;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.saml.context.SAMLContextProvider;
import org.springframework.security.saml.context.SAMLContextProviderImpl;

/**
 * Builder configurer that takes care of configuring/customizing the {@link SAMLContextProvider} bean.
 * <p>
 * Common strategy across most internal configurers is to first give priority to a Spring Bean if present in the
 * Context. So if not {@link SAMLContextProvider} bean is defined, priority goes to a custom SAMLContextProvider
 * provided explicitly to this configurer through the constructor. And if not provided through the constructor, a
 * default implementation is instantiated.
 * </p>
 *
 * @author Ulises Bocchio
 */
public class SAMLContextProviderConfigurer extends SecurityConfigurerAdapter<Void, ServiceProviderBuilder> {

    private SAMLContextProvider samlContextProvider;

    private SAMLMessageStorageFactory messageStorage;
    private SAMLContextProviderProperties samlContextProviderProperties;

    public SAMLContextProviderConfigurer(SAMLContextProvider samlContextProvider) {

        this.samlContextProvider = samlContextProvider;
    }

    public SAMLContextProviderConfigurer() {

    }

    @Override
    public void init(ServiceProviderBuilder builder) throws Exception {
        samlContextProviderProperties = builder.getSharedObject(SAMLSSOProperties.class).getContextProvider();
    }

    @Override
    public void configure(ServiceProviderBuilder builder) throws Exception {
        SAMLContextProvider samlContextProviderBean = builder.getSharedObject(SAMLContextProvider.class);
        if (samlContextProviderBean == null && !samlContextProviderProperties.getLb().isEnabled()) {
            if (samlContextProvider == null) {
                samlContextProvider = createDefaultSamlContextProvider();
            }
            if (messageStorage != null && samlContextProvider instanceof SAMLContextProviderImpl) {
              ((SAMLContextProviderImpl)samlContextProvider).setStorageFactory(messageStorage);
            }
            builder.setSharedObject(SAMLContextProvider.class, samlContextProvider);
        }
    }

    @VisibleForTesting
    protected SAMLContextProvider createDefaultSamlContextProvider() {
        return new SAMLContextProviderImpl();
    }
    
    public SAMLContextProviderConfigurer messageStorage(SAMLMessageStorageFactory messageStorage) {
      this.messageStorage = messageStorage;
      return this;
    }
}
